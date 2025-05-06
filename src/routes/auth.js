const router = require("express").Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("PRODUCER","CONSUMER").required()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
