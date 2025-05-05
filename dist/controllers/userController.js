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
exports.getVideos = exports.sendWhatsappMessage = exports.fetchEventsOfActivity = exports.getAnnouncementsUser = exports.getEvents = exports.adminLogin = exports.memberLogin = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const announcementModel_1 = __importDefault(require("../models/announcementModel"));
const messageHelper_1 = require("../helpers/messageHelper");
const videoModel_1 = __importDefault(require("../models/videoModel"));
const memberLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = req.body.data;
        console.log(phone);
        const user = yield userModel_1.default.findOne({ phone });
        console.log(user);
        if (user) {
            const token = jsonwebtoken_1.default.sign({ phone }, process.env.JWT_SECRET || "");
            res.json({ message: "Welcome back", token: token });
        }
        else {
            res.json({ error: "You are not a member" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.memberLogin = memberLogin;
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body.data;
        const user = yield userModel_1.default.findOne({ username });
        if ((user === null || user === void 0 ? void 0 : user.isAdmin) && user.password === password) {
            const adminToken = jsonwebtoken_1.default.sign({ user: user.id }, process.env.JWT_SECRET || "");
            res.json({ message: "Welcome admin", adminToken: adminToken });
        }
        else {
            res.json({ error: "You are not an admin" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminLogin = adminLogin;
const getEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.showInHome) {
            const events = yield eventModel_1.default.find({ showInHome: true });
            if (events) {
                res.json({ events });
            }
            else {
                res.json({ error: "Something went wrong" });
            }
        }
        else {
            const events = yield eventModel_1.default.find({});
            if (events) {
                res.json({ events });
            }
            else {
                res.json({ error: "Something went wrong" });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEvents = getEvents;
const getAnnouncementsUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showAll = req.headers['x-show-all'];
        if (showAll) {
            const announcements = yield announcementModel_1.default.find({});
            if (announcements) {
                res.json({ announcements, success: true });
            }
            else {
                res.json({ error: "Something went wrong", succes: false });
            }
        }
        else {
            const announcements = yield announcementModel_1.default.find({ showInHome: true });
            if (announcements) {
                res.json({ announcements, success: true });
            }
            else {
                res.json({ error: "Something went wrong", succes: false });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAnnouncementsUser = getAnnouncementsUser;
const fetchEventsOfActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activityName } = req.body;
        const actualName = activityName.charAt(0).toUpperCase() + activityName.slice(1);
        const eventData = yield eventModel_1.default.find({ activity: actualName });
        if (eventData) {
            return res.json({ success: "true", eventData });
        }
        else {
            return res.json({ success: "false" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "Something went wrong" });
    }
});
exports.fetchEventsOfActivity = fetchEventsOfActivity;
const sendWhatsappMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let i = 0; i < 3; i++) {
            const numbers = ["9778385740", "8281650741", "9846492483"];
            var data = (0, messageHelper_1.getTextMessageInput)(numbers[i] || "", 'Welcome to the Movie Ticket Demo App for Node.js!');
            (0, messageHelper_1.sendMessage)(data)
                .then(function (response) {
                res.sendStatus(200);
                console.log(response.statusText);
                return;
            })
                .catch(function (error) {
                console.log(error);
                console.log(error.response.data);
                res.sendStatus(500);
                return;
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendWhatsappMessage = sendWhatsappMessage;
const getVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield videoModel_1.default.find({});
        if (videos) {
            res.json({ videos });
        }
        else {
            res.json({ error: "Something went wrong" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVideos = getVideos;
