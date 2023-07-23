// Import required modules
const dotenv = require("dotenv");
const path = require("path");

// Set the default values for environment variables
const environment = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, `../${environment}.env`);
dotenv.config({ path: envPath });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5000,
  DATABASE: process.env.DATABASE_LOCAL,
  JWT_SECRET: process.env.JWT_SECRET || "hello_from_me",
};
