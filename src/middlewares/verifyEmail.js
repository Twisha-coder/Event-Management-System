const validator = require("email-validator");

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (!validator.validate(email)) {
    return res.sendStatus(400);
  }

  next();
};

module.exports = verifyEmail;
