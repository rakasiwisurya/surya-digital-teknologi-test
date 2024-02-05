const moment = require("moment-timezone");

exports.getZones = async (req, res) => {
  try {
    res.send({
      status: "Success",
      message: "Success get all zone",
      data: moment.tz.names(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};
