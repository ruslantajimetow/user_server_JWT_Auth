const router = require('express').Router();
const authControllers = require('../controllers/auth/authControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerValSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginValSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

router.post(
  '/register',
  validator.body(registerValSchema),
  authControllers.controllers.postRegister
);

router.post(
  '/login',
  validator.body(loginValSchema),
  authControllers.controllers.postLogin
);

module.exports = router;
