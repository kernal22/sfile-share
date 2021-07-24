"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var config = require("config");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectionDb() {
    var MONGO_DB_USER = process.env.MONGO_USER;
    var MONGO_DB_PASS = process.env.MONGO_PASSWORD;
    var MONGO_DB_DATABASE = process.env.MONGO_DATABASE;
    var MONGO_DB_HOST = process.env.MONGO_HOST;
    var MONGO_DB_PROTOCOL = process.env.MONGO_PROTOCOL;
    var URI = MONGO_DB_PROTOCOL + "://" + MONGO_DB_USER + ":" + MONGO_DB_PASS + "@" + MONGO_DB_HOST + "/" + MONGO_DB_DATABASE;
    mongoose_1.connect("mongodb://localhost:27017/fileSharing?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", {
        useFindAndModify: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
        .then(function () {
        console.log("database connected");
    })
        .catch(function (err) {
        console.log(err);
    });
}
exports.default = connectionDb;
//# sourceMappingURL=index.db.js.map