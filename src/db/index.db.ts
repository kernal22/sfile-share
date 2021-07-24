import { connect, connection } from "mongoose";
const config = require("config");
import dotenv from "dotenv";
dotenv.config();

function connectionDb() {
  const MONGO_DB_USER = process.env.MONGO_USER;
  const MONGO_DB_PASS = process.env.MONGO_PASSWORD;
  const MONGO_DB_DATABASE = process.env.MONGO_DATABASE;
  const MONGO_DB_HOST = process.env.MONGO_HOST;
  const MONGO_DB_PROTOCOL = process.env.MONGO_PROTOCOL;

  const URI = `${MONGO_DB_PROTOCOL}://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}`;
  connect(
    "mongodb://localhost:27017/fileSharing?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connectionDb;
