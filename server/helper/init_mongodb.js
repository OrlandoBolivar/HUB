const mongoose = require("mongoose");
const config = require("../config/config");

console.log(config);

mongoose
  .connect("mongodb+srv://jfajardobolivar:oU7zFPmZ9aq6WZeT@cluster0.ei2psbc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connection Successful!!");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

process.on("SIGNIN", async () => {
  await mongoose.connection.close();
  process.exit(0);
});