"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const targetSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    currentWeight: {
        type: Number,
        required: true,
    },
    targetWeight: {
        type: Number,
        required: true,
    },
    targetDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
exports = mongoose_1.default.model('Target', targetSchema);
