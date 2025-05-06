const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const logger = require("../utils/logger");

exports.createOffer = async (req, res, next) => {
  try {
    const { installationId, availableKwh, pricePerKwh, expiresAt } = req.body;
    const offer = await prisma.offer.create({
      data: { installationId, availableKwh, pricePerKwh, expiresAt, status: "ACTIVE" }
    });
    res.status(201).json(offer);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

exports.listOffers = async (req, res, next) => {
  try {
    const offers = await prisma.offer.findMany({
      where: { status: "ACTIVE" },
      include: { installation: true }
    });
    res.json(offers);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
