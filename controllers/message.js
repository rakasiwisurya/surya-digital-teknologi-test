const { default: axios } = require("axios");
const moment = require("moment-timezone");
const { User, sequelize } = require("../models");

const sendEmailToApi = async (user, t) => {
  const message = `${user?.message}`
    .replace("{first_name}", user?.first_name)
    .replace("{last_name}", user?.last_name)
    .replace("{email}", user?.email)
    .replace("{birth_date}", user?.birth_date)
    .replace("{location}", user?.location);

  try {
    const response = await axios.post(
      "/send-email",
      {
        email: user?.email,
        message,
      },
      { baseURL: process.env.BASE_URL_EMAIL_SERVICE }
    );

    await User.update(
      {
        status_message: response?.data?.status?.toUpperCase(),
        sent_time: response?.data?.sentTime,
      },
      { where: { id: user?.id }, transaction: t }
    );

    console.log("message", message);
    console.info(`Success send email ${user?.first_name} ${user?.last_name}`);
  } catch (error) {
    console.error(error.message);
    await sendEmailToApi(user, t);
  }
};

exports.sendEmail = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const users = await User.findAll({
      where: { status_message: "UNSENT" },
      transaction: t,
    });

    if (users.length > 0) {
      await Promise.all(
        await users.map(async (user) => {
          const splittedBirthDate = user.birth_date.split("-");
          const birthMonth = splittedBirthDate[1];
          const birthDay = splittedBirthDate[2];
          const localTimeZone = moment.tz.guess();
          const currentDateTime = moment.tz(localTimeZone).startOf("minute");

          const targetDateTime = moment
            .tz(
              `${currentDateTime.year()}-${birthMonth}-${birthDay} ${
                res ? currentDateTime.format("HH:mm") : "09:00"
              }`,
              user.location
            )
            .startOf("minute");

          if (currentDateTime.isSame(targetDateTime)) {
            await sendEmailToApi(user, t);
          }
        })
      );
    }

    await t.commit();

    if (res) {
      res.send({
        status: "Success",
        message: "Success send all email",
      });
    }
  } catch (error) {
    console.error(error);
    await t.rollback();
    if (res) {
      res.status(500).send({
        status: "Failed",
        message: error.message,
      });
    }
  }
};
