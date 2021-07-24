"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var helpers_1 = require("../helpers");
var controllers_1 = require("../controllers");
var services_1 = require("../services");
var models_1 = require("../models");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var router = express_1.Router();
router.post("/api/file", helpers_1.uploads, controllers_1.FileController.onUploadFile);
router.get("/file/:uuid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uuid, fileData, file, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uuid = req.params.uuid;
                return [4 /*yield*/, models_1.File.findOne({ uuid: uuid })];
            case 1:
                fileData = _a.sent();
                if (fileData) {
                    file = {
                        uuid: fileData.uuid,
                        fileName: fileData.fileName,
                        size: fileData.size,
                        downloadLink: process.env.APP_BASE_URL + "/file/download/" + fileData.uuid,
                    };
                    return [2 /*return*/, res.render("download", file)];
                }
                else {
                    return [2 /*return*/, res.render("download", { err: "Link has been expired" })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).send({ status: false, error: error_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/file/download/:uuid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uuid, fileData, filePath, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uuid = req.params.uuid;
                return [4 /*yield*/, models_1.File.findOne({ uuid: uuid })];
            case 1:
                fileData = _a.sent();
                if (fileData) {
                    filePath = __dirname + "/../../public/uploads/" + fileData.fileName;
                    return [2 /*return*/, res.download(filePath)];
                }
                else {
                    return [2 /*return*/, res.render("download", { err: "Link has been expired" })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).send({ status: false, error: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/api/file/send", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, uuid, emailTo, emailFrom, fileData, response, mailData, info, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, uuid = _a.uuid, emailTo = _a.emailTo, emailFrom = _a.emailFrom;
                if (!uuid || !emailTo || !emailFrom)
                    return [2 /*return*/, res
                            .status(500)
                            .send({ status: false, error: "All fields are required" })];
                return [4 /*yield*/, models_1.File.findOne({ uuid: uuid })];
            case 1:
                fileData = _b.sent();
                if (!fileData) return [3 /*break*/, 4];
                if (fileData.sender) {
                    return [2 /*return*/, res
                            .status(422)
                            .send({ status: false, message: "Email already sent" })];
                }
                fileData.sender = emailFrom;
                fileData.receiver = emailTo;
                return [4 /*yield*/, fileData.save()];
            case 2:
                response = _b.sent();
                mailData = {
                    from: emailFrom,
                    to: emailTo,
                    subject: "File Sharing",
                    text: emailFrom + " shared file with you",
                    html: services_1.mailTemplate(emailFrom, process.env.APP_BASE_URL + "/file/" + fileData.uuid, fileData.size + "KB", "24 hours"),
                };
                return [4 /*yield*/, services_1.EmailService.sendMail(mailData)];
            case 3:
                info = _b.sent();
                if (info)
                    return [2 /*return*/, res.status(200).send({ status: true, message: "Mail sent" })];
                return [2 /*return*/, res
                        .status(500)
                        .send({ status: false, error: "something went wrong" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).send({ status: false, error: error_3.message })];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=file.route.js.map