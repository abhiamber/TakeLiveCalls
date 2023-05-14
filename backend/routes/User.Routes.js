const express = require("express");
require("dotenv").config();

let app = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//end points: "/users/register" for registering any new user;
app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  let user = await UserModel.findOne({ name });
  if (user) {
    return res.status(401).send({ data: "InvalidCredentials" });
  }
  try {
    bcrypt.hash(
      password,
      +process.env.Salt_rounds,
      async (err, secure_password) => {
        if (err) {
          res.status(404).send({ msg: "Registation failed" });
        } else {
          const user = new UserModel({ name, password: secure_password });
          await user.save();
          res.status(201).send({ msg: "Registered Successfully" });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(404).send({ msg: "Registation failed" });
  }
});

//end points: "/users/login" for login the registered user;
app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await UserModel.find({ name });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, results) => {
        if (results) {
          let token = jwt.sign(
            { id: user[0]._id, name: user[0].name },
            process.env.secret_key,
            { expiresIn: "365d" }
          );
          res.send({ msg: "Login Successfully", token, user_id: user[0]._id });
        } else {
          res.status(201).send({ msg: "Wrong Password" });
        }
      });
    } else {
      res.status(201).send({ msg: "Wrong Username" });
    }
  } catch (err) {
    res.status(404).send({ msg: "Login failed" });
  }
});

module.exports = app;
