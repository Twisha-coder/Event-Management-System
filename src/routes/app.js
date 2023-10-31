const cookieParser = require("cookie-parser");
const express = require("express");
const createLoginRouter = require("./login");
const createSignupRouter = require("./signup");
const DataManager = require("../models/dataManager");
const sendFile = require("./serveFile");
const logger = require("../middlewares/logger");
const { createEventRouter, authorize } = require("./eventRouter");
const createLogoutRouter = require("./logout");

const serveHomePage = (req, res) => {
  sendFile(req, res, "index.html");
};

const verifyUser = (req, res) => {
  const { username } = req.cookies;
  const { dataManager } = req.app.context;

  dataManager
    .verifyUser(username)
    .then((user) => {
      if (user) {
        return res.send(JSON.stringify({ username }));
      }

      res.sendStatus(404);
    })
    .catch((err) => console.error(err.message));
};

const serveDetails = (req, res) => {
  const { dataManager } = req.app.context;
  const { username } = req.cookies;
  dataManager
    .getDetails(username)
    .then((response) => res.send(response))
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

const createApp = () => {
  const app = express();

  const dataManager = new DataManager();
  app.context = { dataManager };

  const loginRouter = createLoginRouter();
  const signupRouter = createSignupRouter();
  const eventRouter = createEventRouter();
  const logoutRouter = createLogoutRouter();

  app.use(cookieParser());
  app.use(logger);
  app.use(express.json());
  app.use(express.static("public"));

  app.post("/verify", verifyUser);
  app.get("/", serveHomePage);
  app.post("/profileDetails", authorize, serveDetails);
  app.use("/login", loginRouter);
  app.use("/signup", signupRouter);
  app.use("/event", eventRouter);
  app.use("/logout", logoutRouter);

  return app;
};

module.exports = createApp;
