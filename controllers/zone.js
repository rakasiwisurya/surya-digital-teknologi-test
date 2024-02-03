const { default: axios } = require("axios");
const moment = require("moment-timezone");

exports.getZones = async (req, res) => {
  try {
    res.send({
      status: "Success",
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
