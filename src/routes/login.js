const { Router } = require("express");
const sendFile = require("./serveFile");

const serveLoginPage = (req, res) => {
  sendFile(req, res, "login.html");
};

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  const { dataManager } = req.app.context;

  dataManager
    .validateUser(email, password)
    .then((response) => {
      const username = response.USERNAME;
      if (username) {
        res.cookie("username", username);
        res.sendStatus(202);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(404);
    });
};

const createLoginRouter = () => {
  const router = new Router();
  router.get("/", serveLoginPage);
  router.post("/", handleLogin);
  return router;
};

module.exports = createLoginRouter;
