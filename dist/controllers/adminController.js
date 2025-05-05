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
exports.postVideo = exports.deleteGalleryFolder = exports.getGalleryFolders = exports.deleteAnnouncement = exports.editAnnouncement = exports.getAnnouncements = exports.postAnnouncement = exports.removeEvent = exports.editEventInfo = exports.getEventInfo = exports.getEvents = exports.postEvent = void 0;
const formatDataAndTime_1 = require("../helpers/formatDataAndTime");
const eventModel_1 = __importDefault(require("../models/eventModel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const announcementModel_1 = __importDefault(require("../models/announcementModel"));
const galleryModel_1 = __importDefault(require("../models/galleryModel"));
const videoModel_1 = __importDefault(require("../models/videoModel"));
const postEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, venue, seats, dates, time, showInHome, activity } = req.body.eventData;
        const startDateIST = (0, moment_timezone_1.default)(dates[0]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const endDateIST = (0, moment_timezone_1.default)(dates[1]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const finalDate = [startDateIST, endDateIST];
        console.log("final", finalDate);
        console.log("image location from 2nd route", req.body.imageLocation);
        const formatedDates = (0, formatDataAndTime_1.convert)(finalDate, time);
        const startDate = (formatedDates[0]);
        const endDate = (formatedDates[1]);
        console.log(formatedDates);
        const postEvent = yield eventModel_1.default.create({
            title,
            desc: description,
            venue,
            seats,
            startDate,
            endDate,
            showInHome,
            activity,
            img: req.body.imageLocation
        });
        if (postEvent) {
            res.json({ message: "Event hosted" });
        }
        else {
            res.json({ error: "Coudn't host the event" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEvent = postEvent;
const getEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventList = yield eventModel_1.default.find({});
        if (eventList) {
            res.json({ events: eventList });
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEvents = getEvents;
const getEventInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield eventModel_1.default.findById({ _id: eventId });
        if (event) {
            return res.json({ eventInfo: event });
        }
        return res.json({ error: "Something went wrong while getting event" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEventInfo = getEventInfo;
const editEventInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, venue, seats, dates, time, showInHome } = req.body.eventData;
        const startDateIST = (0, moment_timezone_1.default)(dates[0]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const endDateIST = (0, moment_timezone_1.default)(dates[1]).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const finalDate = [startDateIST, endDateIST];
        console.log("final", finalDate);
        console.log("image location from 2nd route", req.body.imageLocation);
        const formatedDates = (0, formatDataAndTime_1.convert)(finalDate, time);
        const startDate = (formatedDates[0]);
        const endDate = (formatedDates[1]);
        console.log(formatedDates);
        const id = req.params.id;
        const updateEventInfo = yield eventModel_1.default.updateOne({ _id: id }, { $set: { title, desc: description, venue, seats, startDate,
                endDate, showInHome,
                img: req.body.imageLocation } });
        if (updateEventInfo) {
            res.json({ message: "Updated information successfully" });
        }
        else {
            res.json({ error: "Something went wrong while updating" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.editEventInfo = editEventInfo;
const removeEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("dsdsd");
        const id = req.params.id;
        const deleteEvent = yield eventModel_1.default.deleteOne({ _id: id });
        if (deleteEvent) {
            res.json({ message: "Removed event successfully" });
        }
        else {
            res.json({ error: "Something went wrong on removing" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.removeEvent = removeEvent;
const postAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, last_date, showInHome } = req.body;
        const modifiedDate = last_date ? new Date(last_date) : null;
        const fileLocation = req.file ? req.file.location : "";
        const pushAnnouncement = yield announcementModel_1.default.create({
            title,
            description,
            lastDate: modifiedDate ? modifiedDate : null,
            file: fileLocation,
            showInHome
        });
        if (pushAnnouncement) {
            res.json({ message: "Announcement made", success: true });
        }
        else {
            res.json({ error: "Something went wrong", succes: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.postAnnouncement = postAnnouncement;
const getAnnouncements = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const announcements = yield announcementModel_1.default.find({});
        if (announcements) {
            res.json({ announcements, success: true });
        }
        else {
            res.json({ error: "Something went wrong", succes: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAnnouncements = getAnnouncements;
const editAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, last_date, id, showInHome } = req.body;
        const modifiedDate = last_date ? new Date(last_date) : null;
        const fileLocation = req.file ? req.file.location : "";
        if (fileLocation) {
            yield announcementModel_1.default.updateOne({ _id: id }, { $set: { title: title, description: description, lastDate: modifiedDate, file: fileLocation, showInHome } });
        }
        else {
            yield announcementModel_1.default.updateOne({ _id: id }, { $set: { title: title, description: description, lastDate: modifiedDate, showInHome } });
        }
        res.json({ message: "Updated announcement", success: true });
    }
    catch (error) {
        res.json({ error: "Something went wrong", success: false });
        console.log(error);
    }
});
exports.editAnnouncement = editAnnouncement;
const deleteAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.body.id;
        const deleteOne = yield announcementModel_1.default.deleteOne({ _id: itemId });
        if (deleteOne) {
            res.json({ message: "Removed announcement", success: true });
        }
        else {
            res.json({ success: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAnnouncement = deleteAnnouncement;
const getGalleryFolders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folders = yield galleryModel_1.default.find({}, { folderName: 1, _id: 0 }).sort({ dateCreated: -1 });
        console.log(folders);
        const folderNames = folders.map((item) => item.folderName);
        res.json({ folderNames });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getGalleryFolders = getGalleryFolders;
const deleteGalleryFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folderName } = yield req.body;
        if (folderName) {
            const deleteFolder = yield galleryModel_1.default.findOneAndDelete({ folderName });
            if (deleteFolder) {
                return res.json({ success: true, message: "Folder deleted" });
            }
            else {
                return res.json({ success: false, message: "Folder deletion failed" });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteGalleryFolder = deleteGalleryFolder;
const postVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("dsdsd", req.body);
        const { description } = req.body;
        const fileLocation = req.file ? req.file.location : "";
        const videoContent = yield videoModel_1.default.create({
            description,
            file: fileLocation
        });
        if (videoContent) {
            res.json({ message: "Video uploaded successfully", success: true });
        }
        else {
            res.json({ error: "Something went wrong", succes: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.postVideo = postVideo;
