const router = require("express").Router();
const offersController = require("../controllers/offersController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const Joi = require("joi");

const schema = Joi.object({
  installationId: Joi.number().integer().required(),
  availableKwh: Joi.number().integer().required(),
  pricePerKwh: Joi.number().positive().required(),
  expiresAt: Joi.date().iso().required()
});

router.post("/", auth, validate(schema), offersController.createOffer);
router.get("/", auth, offersController.listOffers);

module.exports = router;
