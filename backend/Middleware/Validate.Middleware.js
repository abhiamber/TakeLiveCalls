require("dotenv").config();
const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
  let { token, eventId } = req.headers;
  token = jwt.decode(token, process.env.secret_key);

  if (token) {
    next();
  } else {
    // console.log("hiiiiiiiiiiiiii");

    res.send({ status: "NO", msg: "Unauthorized Please Login First" });
  }
};

module.exports = validate;
