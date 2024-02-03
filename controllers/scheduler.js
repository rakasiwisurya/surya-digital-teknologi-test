const moment = require("moment-timezone");
const { User } = require("../models");
const { default: axios } = require("axios");

const sendEmail = async (user) => {
  try {
    const response = await axios.post(
      "/send-email",
      {
        email: user?.email,
        message: `Hey, ${user?.first_name} ${user?.last_name} it’s your birthday`,
      },
      { baseURL: process.env.BASE_URL_EMAIL_SERVICE }
    );

    await User.update(
      {
        status_message: response?.data?.status?.toUpperCase(),
        sent_time: response?.data?.sentTime,
      },
      { where: { id: user?.id } }
    );

    console.log("Success send email");
  } catch (error) {
    console.error(error.message);
    if (error?.response?.status === 500) sendEmail(user);
  }
};

exports.runScheduler = async () => {
  try {
    const intervalTime = 60 * 60 * 1000; // 1 hour
    // const intervalTime = 10_000; // 10 second

    setInterval(async () => {
      const users = await User.findAll({ where: { status_message: "UNSEND" } });
      if (users.length > 0) {
        await Promise.all(
          await users.map(async (user) => {
            const splittedBirthDate = user.birth_date.split("-");
            const birthMonth = splittedBirthDate[1];
            const birthDay = splittedBirthDate[2];
            const currentDateTime = moment.tz(user.location).startOf("minute");

            const targetDateTime = moment
              .tz(
                `${currentDateTime.year()}-${birthMonth}-${birthDay} 09:00`,
                user.location
              )
              .startOf("minute");

            if (currentDateTime.isSame(targetDateTime)) await sendEmail(user);
          })
        );
      }
    }, intervalTime);
  } catch (error) {
    console.error(error.message);
  }
};
