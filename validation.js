const Joi = require('@hapi/joi');
const { BAD_REQUEST } = require('http-status-codes');

const registerSchema = Joi.object().keys({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object().keys({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

module.exports.validateRegisterBody = (request, response, next) => {
  validateBody(request, response, next, registerSchema);
};

module.exports.validateLoginBody = (request, response, next) => {
  validateBody(request, response, next, loginSchema);
};

const validateBody = (request, response, next, schema) => {
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    console.log(result.error);
    return response.status(BAD_REQUEST).json(result.error.details);
  }
  next();
};
