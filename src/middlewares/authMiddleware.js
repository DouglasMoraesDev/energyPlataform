const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};
