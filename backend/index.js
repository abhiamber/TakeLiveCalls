const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app); //server creation by http inbuit node module;
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080; //defined port 8080 (default 3000) excluding 27017 (reserved port by Mongod);
const connect = require("./config/db");
//Different Routers for different frontend pages in UI;
const UserRouter = require("./routes/User.Routes");
const GameRouter = require("./routes/Game.Routes");
const GameAdminRouter = require("./routes/Game.Admin.Route");
const EventValidator = require("./Middleware/Event.Validator");
//Inbuilt middlewares;
app.use(express.text());
app.use(express.json());
app.use(cors());

//Landing/default route;
app.get("/", async (req, res) => {
  res.send("Welcome in Playo App😊!!!");
});

//Fixed starting end points for making nested dynamic route;
app.use("/users", UserRouter);
app.use(EventValidator);

app.use("/events", GameRouter);
app.use("/admin", GameAdminRouter);

//server code for start or live my server at defined port;
httpServer.listen(PORT, async () => {
  try {
    await connect();
    console.log("connected to DB");
  } catch (e) {
    console.log({ message: e.message });
  }
  console.log(`Server is running at port ${PORT}`);
});
