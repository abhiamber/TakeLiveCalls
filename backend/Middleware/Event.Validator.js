require("dotenv").config();
const jwt = require("jsonwebtoken");
const GameModel = require("../models/game.model");

const validate = async (req, res, next) => {
  let { token, eventId } = req.headers;
  token = jwt.decode(token, process.env.secret_key);

  if (token) {
    let AllEvents = await GameModel.find();

    AllEvents = AllEvents.map((elem) => {
      const currentDate = new Date();

      if (elem.start <= currentDate) {
        elem.eventExpired = true;
        elem.expiredUser = elem.requestToJoin;
        elem.requestToJoin = [];
      }

      return elem; // Return the modified event
    });

    for (const event of AllEvents) {
      await event.save();
    }

    // console.log(AllEvents);

    next();
  } else {
    res.send({ status: "NO", msg: "Unauthorized Please Login First" });
  }
};

module.exports = validate;
