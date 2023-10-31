const createApp = require("./src/routes/app");

const port = process.env.PORT || 8080;

const main = () => {
  const app = createApp();
  app.listen(port, console.log("Listening to port ", port));
};

main();
