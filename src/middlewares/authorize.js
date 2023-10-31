const authorize = (req, res, next) => {
  const { dataManager } = req.app.context;
  const { username } = req.cookies;

  if (isInvalid(username)) return res.sendStatus(401);
  dataManager
    .verifyUser(username)
    .then((response) => {
      if (response) {
        next();
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.send(500);
    });
};

const isInvalid = (field) => field === undefined || field.length === 0;

module.exports = { authorize, isInvalid };
