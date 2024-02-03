const Joi = require("joi");
const { User } = require("../models");
const { Op } = require("sequelize");

exports.addUser = async (req, res) => {
  const { email } = req.body;

  const schema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    birth_date: Joi.date().required(),
    location: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  try {
    const isUserExist = await User.findOne({
      where: {
        [Op.and]: { email },
      },
    });

    if (isUserExist) {
      return res.status(400).send({
        status: "Failed",
        message: "User already exist",
      });
    }

    await User.create({ ...req.body, status_message: "UNSEND" });

    res.send({
      status: "Success",
      message: "Success add user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = User.findAll();
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
    location: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  try {
    const isUserExist = await User.findOne({
      where: { id },
    });

    if (!isUserExist) {
      return res.status(400).send({
        status: "Failed",
        message: "User doesn't exist",
      });
    }

    await User.update(req.body, {
      where: { id },
    });

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const isUserExist = await User.findOne({
      where: { id },
    });

    if (!isUserExist) {
      return res.status(400).send({
        status: "Failed",
        message: "User doesn't exist",
      });
    }

    await User.destroy({
      where: { id },
    });

    res.send({
      status: "Success",
      message: "Success delete user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};
