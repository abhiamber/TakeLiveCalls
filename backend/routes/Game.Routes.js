const express = require("express");
require("dotenv").config();

const app = express.Router();
const validate = require("../Middleware/Validate.Middleware");
const GameModel = require("../models/game.model");
const jwt = require("jsonwebtoken");
// const EventValidator = require("../Middleware/Validate.Middleware");

//end points: "/events/post" for creating any new event by any logged user after creation that user become admin of that event;
app.post("/", validate, async (req, res) => {
  let { name, desc, start, end, maxPlayer } = req.body;
  let { token } = req.headers;
  token = jwt.decode(token, process.env.secret_key);
  let adminid = token.id;

  try {
    const event = new GameModel({ name, desc, start, end, maxPlayer, adminid });
    await event.save();
    res
      .status(201)
      .send({ msg: "Successfully Created an Event", event, status: "Ok" });
  } catch (err) {
    res.status(404).send({ Error: err.message, status: "NO" });
  }
});

//end points: "/events/get" for getting all events created by differnt admin;

// app.use(EventValidator);
app.get("/", async (req, res) => {
  let { name, q, page = 1, limit = 10 } = req.query;
  // console.log(req.query);

  try {
    if (name) {
      let events = await GameModel.find({ name });
      res.status(200).send(events);
    } else if (q) {
      let events = await GameModel.find({
        name: { $regex: `${q}`, $options: "six" },
      });
      res.status(200).send(events);
    } else if (page) {
      if (Number(page) === 1) {
        let events = await GameModel.find()
          .skip((Number(page) - 1) * 10)
          .limit(20);
        res.status(200).send(events);
      }
    } else {
      let events = await GameModel.find();
      res.status(200).send(events);
    }
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

//end points: "/events/get/:id" for getting any particular event by id;
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const event = await GameModel.findOne({ _id: id });
    res
      .status(200)
      .send({ msg: `Successfully get Event which id is ${id}`, event });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

module.exports = app;
