const { Router } = require("express");
const verifyEmail = require("../middlewares/verifyEmail");
const { authorize, isInvalid } = require("../middlewares/authorize");

const handleSubmission = (req, res) => {
  const { dataManager } = req.app.context;
  dataManager
    .registerUserEvent(req.body)
    .then((response) => {
      if (response) return res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(400);
    });
};

const validateEventData = (req, res, next) => {
  const { firstName, lastName, event } = req.body; //TODO: manage event data
  if (isInvalid(firstName) || isInvalid(lastName)) return res.sendStatus(400);
  next();
};

const createEventRouter = () => {
  const router = new Router();
  router.post(
    "/registration",
    authorize,
    verifyEmail,
    validateEventData,
    handleSubmission
  );
  return router;
};

module.exports = { createEventRouter, authorize };
