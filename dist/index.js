"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./routes/userRoute");
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const cors_1 = __importDefault(require("cors"));
const adminRouter_1 = require("./routes/adminRouter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use('/user', userRoute_1.userRouter);
app.use('/admin', adminRouter_1.adminRouter);
(0, dbConnect_1.default)();
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.listen(3000, () => {
    console.log("Server running");
});
