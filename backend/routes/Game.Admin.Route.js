const express = require("express");
let app = express.Router();
require("dotenv").config();

const GameModel = require("../models/game.model");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const validate = require("../Middleware/Validate.Middleware");

//end point: "/getadminevents" for getting all requests of users for different events;
app.get("/getadminevents", validate, async (req, res) => {
  let { token } = req.headers;
  token = jwt.decode(token, process.env.secret_key);
  try {
    let requests = await GameModel.find({ adminid: token.id });
    res.send({ messg: requests });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

//end point: accept the req of user to enter in event;
app.patch("/accept", validate, async (req, res) => {
  const { event_id, userId } = req.body;

  try {
    let findEvents = await GameModel.findById({ _id: event_id });
    let remove = findEvents.requestToJoin.filter((elem) => elem.id === userId);
    let updatedReqToJoinList = findEvents.requestToJoin.filter(
      (elem) => elem.id !== userId
    );
    findEvents.acceptedUser.push(remove[0]);
    findEvents.requestToJoin = updatedReqToJoinList;
    await findEvents.save();

    // console.log(findEvents);

    res.status(200).send({ msg: `Successfully update Status`, findEvents });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

//end points: reject the user request so he can join avent;
app.patch("/reject", validate, async (req, res) => {
  const { event_id, userId } = req.body;

  try {
    let findEvents = await GameModel.findById({ _id: event_id });
    let remove = findEvents.requestToJoin.filter((elem) => elem.id === userId);
    let updatedReqToJoinList = findEvents.requestToJoin.filter(
      (elem) => elem.id !== userId
    );
    findEvents.rejectedUser.push(remove[0]);
    findEvents.requestToJoin = updatedReqToJoinList;
    await findEvents.save();

    // console.log(findEvents);

    res.status(200).send({ msg: `Successfully update Status`, findEvents });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

//end points: craete req for joining evnet;
app.post("/joinreq", async (req, res) => {
  let { event_id } = req.body;

  let { token } = req.headers;
  // console.log(event_id);
  token = jwt.decode(token, process.env.secret_key);
  let user_id = token.id;
  let event = await GameModel.findOne({ _id: event_id });
  // console.log(event.adminid, user_id);

  try {
    if (event.adminid == user_id) {
      res.send({
        msg: "You are organizer so You can't Join this event",
      });
    } else {
      if (+event.maxPlayer > event.acceptedUser.length) {
        // console.log(event);
        let userName = await UserModel.findOne({ _id: user_id });
        event.requestToJoin.push({ name: userName.name, id: user_id });
        await event.save();
        // console.log(event);

        return res.send({ msg: "Send Request", event });
      }
    }
  } catch (err) {
    // console.log(err.message);
    res.status(404).send({ Error: err.message });
  }
});

// **************check status of req sent for join the game**********

app.get("/status", async (req, res) => {
  const { id, index } = req.params;
  let { token } = req.headers;
  token = jwt.decode(token, process.env.secret_key);
  try {
    let allGames = await GameModel.find();
    let statusOfApplication = [];
    for (let i = 0; i < allGames.length; i++) {
      let obj = {};
      let flag = false;
      obj.name = allGames[i].name;
      obj.player = allGames[i].maxPlayer;
      obj.start = allGames[i].start;

      let Accepted = allGames[i].acceptedUser;
      let Rejetced = allGames[i].rejectedUser;
      let pending = allGames[i].expiredUser;
      let processes = allGames[i].requestToJoin;

      for (let j = 0; j < Accepted.length; j++) {
        if (Accepted[j].id === token.id) {
          obj.status = "Accepted";
          flag = true;
        }
      }

      for (let j = 0; j < Rejetced.length; j++) {
        if (Rejetced[j].id === token.id) {
          obj.status = "Rejetced";
          flag = true;
        }
      }

      for (let j = 0; j < pending.length; j++) {
        if (pending[j].id === token.id) {
          obj.status = "pending";
          flag = true;
        }
      }

      for (let j = 0; j < processes.length; j++) {
        if (processes[j].id === token.id) {
          obj.status = "processes";
          flag = true;
        }
      }
      if (flag) {
        statusOfApplication.push(obj);
      }
    }

    // console.log(allGames);
    res.status(200).send({
      msg: `Successfully get Accepted Users`,
      allGames: statusOfApplication,
    });
  } catch (err) {
    res.status(404).send({ Error: err.message });
  }
});

module.exports = app;
