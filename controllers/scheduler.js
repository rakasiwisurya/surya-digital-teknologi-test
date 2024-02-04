const moment = require("moment-timezone");
const { sendEmail } = require("./message");

exports.runScheduler = async () => {
  const localTimeZone = moment.tz.guess();
  const currentDateTime = moment.tz(localTimeZone);

  const intervalTime = 60 * 60 * 1000; // 1 hour
  if (currentDateTime.minute() === 0) {
    setInterval(sendEmail, intervalTime);
    sendEmail();
  }
  sendEmail();
};
