const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const logger = require("../utils/logger");

exports.createInstallation = async (req, res, next) => {
  try {
    const { capacityKw, location, proofDocument } = req.body;
    const inst = await prisma.installation.create({
      data: { capacityKw, location, proofDocument, userId: req.user.id }
    });
    res.status(201).json(inst);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

exports.listInstallations = async (req, res, next) => {
  try {
    const insts = await prisma.installation.findMany({ where: { userId: req.user.id } });
    res.json(insts);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
