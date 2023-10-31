const { Router } = require("express");
const sendFile = require("./serveFile");
const verifyEmail = require("../middlewares/verifyEmail");

const serveSignupPage = (req, res) => {
  sendFile(req, res, "signup.html");
};

const isInvalid = (field) => {
  return field === undefined || field.length === 0;
};

const handleSignUp = async (req, res) => {
  const { name, surname, email, password } = req.body;
  const { dataManager } = req.app.context;
  const username = name + surname;

  dataManager
    .addUser({
      username,
      name,
      surname,
      email,
      password,
    })
    .then((response) => {
      if (response) {
        res.cookie("username", username);
        res.sendStatus(201);
      }
    })
    .catch((e) => {
      res.sendStatus(409);
    });
};

const validateDetails = (req, res, next) => {
  const { name, surname, password } = req.body;
  if (isInvalid(name) || isInvalid(surname)) return res.sendStatus(400);
  if (password.length < 8) return res.sendStatus(400);

  next();
};

const createSignupRouter = () => {
  const router = new Router();
  router.get("/", serveSignupPage);
  router.post("/", verifyEmail, validateDetails, handleSignUp);
  return router;
};

module.exports = createSignupRouter;
