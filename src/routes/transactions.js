const router = require("express").Router();
const transactionsController = require("../controllers/transactionsController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const Joi = require("joi");

const schema = Joi.object({
  offerId: Joi.number().integer().required(),
  kwh: Joi.number().integer().positive().required()
});

router.post("/", auth, validate(schema), transactionsController.buyCredits);
router.get("/", auth, transactionsController.listTransactions);

module.exports = router;
