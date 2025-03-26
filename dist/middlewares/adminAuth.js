"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    try {
        if (req.body.userType == "admin") {
            const adminToken = req.headers.authorization || "";
            const veifyToken = jsonwebtoken_1.default.verify(adminToken, process.env.JWT_SECRET || "", (err, decoded) => {
                if (err) {
                    res.json({ error: "You are not authorized" });
                }
                if (decoded) {
                    next();
                }
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.adminAuth = adminAuth;
