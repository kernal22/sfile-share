"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importStar(require("express"));
var path_1 = require("path");
var index_db_1 = __importDefault(require("./db/index.db"));
var index_1 = __importDefault(require("./routes/index"));
var ejs_locals_1 = __importDefault(require("ejs-locals"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Server = /** @class */ (function () {
    function Server() {
        this._app = express_1.default();
        this.handleException();
        this.initMiddleware();
    }
    Server.prototype.initMiddleware = function () {
        this._app.use(express_1.json());
        this._app.use(express_1.urlencoded({ extended: true }));
        this._app.use("/static", express_1.default.static(path_1.join(__dirname, "/../public")));
        this._app.use("views", express_1.default.static(path_1.join(__dirname, "/views")));
        //setting template engine and views
        this._app.engine("ejs", ejs_locals_1.default);
        this._app.set("view engine", "ejs");
        //ROUTES
        this._app.use("/", index_1.default);
        this._app.use(this.routeNotFoundError.bind(this));
        this._app.use(this.errorHandler);
        index_db_1.default();
    };
    Server.prototype.routeNotFoundError = function (req, res, next) {
        return res.status(404).send({
            status: false,
            error: "NOT_FOUND",
            message: req.method + " " + req.url + " route not found",
        });
    };
    Server.prototype.errorHandler = function (error, req, res) {
        console.error(error);
        return res.send(500).send({ error: error });
    };
    Server.prototype.handleException = function () {
        process.on("uncaughtException", function (e) {
            console.log(e);
            process.exit(1);
        });
        process.on("unhandledRejection", function (e) {
            console.log(e);
            process.exit(1);
        });
    };
    Server.prototype.listen = function () {
        this._app.listen(process.env.PORT, function () {
            console.log("server running on " + process.env.ENV + " mode");
            console.log("server is running on port " + process.env.PORT);
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map