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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("./middleware/errors");
const logger_1 = require("./middleware/logger");
const challenge_1 = __importDefault(require("./models/challenge"));
dotenv_1.default.config();
let data = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Max' },
];
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(logger_1.requestLogger);
app.use(express_1.default.static('build'));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello there!');
});
app.get('/api/setchallenge', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield challenge_1.default.find({});
    res.json(data);
}));
app.post('/api/setchallenge', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body === undefined) {
        return res.status(400).json({ error: 'content missing' });
    }
    const { name, currentWeight, targetWeight, targetDate } = req.body;
    const challenge = new challenge_1.default({
        name,
        currentWeight: Number(currentWeight),
        targetWeight: Number(targetWeight),
        targetDate: new Date(targetDate),
    });
    const response = yield challenge.save();
    res.status(200).json(response);
}));
app.delete('/api/setchallenge/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield challenge_1.default.findByIdAndRemove(id);
    res.status(200).json(response);
}));
app.get('/api/setchallenge/names', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield challenge_1.default.find({}).select('name -_id');
    const names = data.map((el) => el.name);
    console.log(555, names);
    res.status(200).json(names);
}));
app.use(errors_1.unknownEndpoint);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then((result) => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at https://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
