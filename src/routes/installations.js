const router = require("express").Router();
const installationsController = require("../controllers/installationsController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const Joi = require("joi");

const schema = Joi.object({
  capacityKw: Joi.number().positive().required(),
  location: Joi.string().required(),
  proofDocument: Joi.string().required()
});

router.post("/", auth, validate(schema), installationsController.createInstallation);
router.get("/", auth, installationsController.listInstallations);

module.exports = router;
