const { PrismaClient } = require("@prisma/client");
const blockchainService = require("../services/blockchainService");
const prisma = new PrismaClient();
const logger = require("../utils/logger");

exports.buyCredits = async (req, res, next) => {
  try {
    const { offerId, kwh } = req.body;
    const tx = blockchainService.buyCredit(offerId, req.user.id, kwh);
    const transaction = await prisma.transaction.create({
      data: {
        offerId,
        buyerId: req.user.id,
        kwh,
        totalPrice: tx.totalPrice,
        status: "CONFIRMED",
        txHash: tx.txHash
      }
    });
    res.status(201).json(transaction);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

exports.listTransactions = async (req, res, next) => {
  try {
    const txs = await prisma.transaction.findMany({
      where: { buyerId: req.user.id },
      include: { offer: { include: { installation: true } } }
    });
    res.json(txs);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
