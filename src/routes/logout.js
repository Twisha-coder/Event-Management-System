const { Router } = require("express");
const { authorize } = require("./eventRouter");

const logout = (req, res) => {
  const { username } = req.cookies;
  console.log("Logged out ", username);
  res.cookie("username", "", { expires: new Date(0) });
  res.sendStatus(200);
};

const createLogoutRouter = () => {
  const router = new Router();
  router.post("/", authorize, logout);
  return router;
};

module.exports = createLogoutRouter;
