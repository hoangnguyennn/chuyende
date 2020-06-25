const Token = require("../utils/token");
const logger = require("../utils/logger");

module.exports.checkToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Token no provided",
      status: false
    });
  }

  try {
    const decode = Token.decodeToken(accessToken);

    res.locals.decode = decode;
    next();
  } catch (e) {
    logger.error(e);
    res.clearCookie("accessToken");
    return res.status(400).json({
      message: "Invalid token",
      status: false
    });
  }
};

module.exports.checkAdmin = (req, res, next) => {
  this.checkToken(req, res, () => {
    const { decode } = res.locals;

    if (!decode) {
      return res.status(401).json({
        message: "Token no provided",
        status: false
      });
    }

    if (!decode.isAdmin) {
      return res.status(403).json({
        message: "Permission denied",
        status: false
      });
    }

    next();
  });
};
