const joi = require("@hapi/joi");

const schema = {
  user: joi.object({
    user_name: joi.string().max(100).required(),
    //last_name: joi.string().max(100).required(),
    //gender: joi.string().valid("m", "f", "o").required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
};

module.exports = schema;
