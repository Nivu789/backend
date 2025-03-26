"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization || "";
        // console.log(token)
        const tokenCheck = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
            if (err) {
                return res.json({ error: "Unauthorized" });
            }
            else {
                return res.json({ message: "Success" });
            }
        });
    }
    catch (error) {
        res.json({ error: "Login to access this page" });
    }
};
exports.authMiddleware = authMiddleware;
