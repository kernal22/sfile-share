"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
var mongoose_1 = require("mongoose");
var fileSchema = new mongoose_1.Schema({
    fileName: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, trim: true },
    receiver: { type: String, trim: true },
}, { timestamps: true });
var File = mongoose_1.model("File", fileSchema);
exports.File = File;
//# sourceMappingURL=file.model.js.map