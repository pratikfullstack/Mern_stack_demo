const userController = require("../api/Controller/User/user.controller");

const initialize = (app) => {
  app.use("/api/v1/user", userController);
};
module.exports = { initialize };
