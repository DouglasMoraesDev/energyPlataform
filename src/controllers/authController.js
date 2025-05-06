const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { secret, expiresIn } = require("../config/jwt");
const prisma = new PrismaClient();
const logger = require("../utils/logger");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role }
    });
    res.status(201).json(user);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn });
    res.json({ token });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
