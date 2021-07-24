"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var file_route_1 = __importDefault(require("./file.route"));
var _router = express_1.Router();
_router.use("/", file_route_1.default);
exports.default = _router;
//# sourceMappingURL=index.js.map