const Joi = require("joi");
const moment = require("moment-timezone");
const { Op } = require("sequelize");
const { User, sequelize } = require("../models");

exports.addUser = async (req, res) => {
  const { email, first_name, last_name } = req.body;

  const schema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    birth_date: Joi.date().required(),
    location: Joi.string()
      .valid(...moment.tz.names())
      .optional(),
    message: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  const t = await sequelize.transaction();

  try {
    const isUserExist = await User.findOne({
      where: {
        [Op.or]: {
          email,
          [Op.and]: { first_name, last_name },
        },
      },
      transaction: t,
    });

    if (isUserExist) {
      return res.status(400).send({
        status: "Failed",
        message: "Email or first name and last name already exist",
      });
    }

    await User.create(
      {
        ...req.body,
        location: req.body.location ? req.body.location : moment.tz.guess(),
      },
      { transaction: t }
    );

    // code for bulk insert dummy data
    // const arrays = Array.from(Array(100));
    // const bulkData = arrays.map((_, index) => ({
    //   ...req.body,
    //   first_name: `${index}${req.body.first_name}`,
    //   last_name: `${index}${req.body.last_name}`,
    //   email: `${index}${req.body.email}`,
    //   location: req.body.location ? req.body.location : moment.tz.guess(),
    // }));
    // await User.bulkCreate(bulkData);

    await t.commit();

    res.send({
      status: "Success",
      message: "Success add user",
    });
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send({
      status: "Success",
      message: "Success get all user",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const schema = Joi.object({
    first_name: Joi.string().max(50).optional(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().email().optional(),
    birth_date: Joi.date().optional(),
    location: Joi.string()
      .valid(...moment.tz.names())
      .optional(),
    message: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  const t = await sequelize.transaction();

  try {
    const isUserExist = await User.findOne({
      where: { id },
      transaction: t,
    });

    if (!isUserExist) {
      return res.status(400).send({
        status: "Failed",
        message: "User doesn't exist",
      });
    }

    await User.update(req.body, {
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const t = await sequelize.transaction();

  try {
    const isUserExist = await User.findOne({
      where: { id },
      transaction: t,
    });

    if (!isUserExist) {
      return res.status(400).send({
        status: "Failed",
        message: "User doesn't exist",
      });
    }

    await User.destroy({
      where: { id },
      transaction: t,
    });

    await t.commit();

    res.send({
      status: "Success",
      message: "Success delete user",
    });
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};
