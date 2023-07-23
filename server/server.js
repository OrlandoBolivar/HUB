const config = require("./config/config");
const app = require("./app");

app.listen(config.PORT, () => {
  console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});
