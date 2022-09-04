"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const challengeSchema = new Schema({
    name: {
        type: String,
        required: true,
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
const Challenge = mongoose_1.default.model('Challenge', challengeSchema);
exports.default = Challenge;
