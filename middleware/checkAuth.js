const jwt = require("jsonwebtoken");
const {blacklist} = require("../controller/user");

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (blacklist.includes(token)) {
      return res.status(401).json({
        message:"Token revoked"
      });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decodedToken;
      next();
    }
  } catch (e) {
    console.log(blacklist)
    return res.status(401).json({
      message: "invalid or expire token",
      error: blacklist,
    });
  }
}

module.exports = { checkAuth: checkAuth };
