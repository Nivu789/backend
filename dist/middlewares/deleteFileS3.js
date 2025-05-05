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
exports.deleteFileS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const announcementModel_1 = __importDefault(require("../models/announcementModel"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const deleteFileS3 = (req, res, next) => {
    var _a, _b;
    try {
        if (req.body.filePath) {
            const filePath = req.body.filePath.slice(52, req.body.filePath.length).replace(/%20/g, ' ');
            console.log(filePath);
            s3.deleteObject({ Bucket: "samskrithibucket", Key: filePath }, function (err, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err, err.stack);
                    }
                    // error
                    else {
                        const deleteFile = yield announcementModel_1.default.updateOne({ _id: req.body.id }, { $set: { file: "" } });
                        if (deleteFile) {
                            return res.json({ success: true });
                        }
                    } // deleted
                });
            });
        }
        else if (req.body.committeeFile) {
            console.log(req.body.committeeFile);
            s3.deleteObject({ Bucket: "samskrithibucket", Key: req.body.committeeFile }, function (err, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err, err.stack);
                    }
                    else {
                        return res.json({ success: true });
                    }
                });
            });
        }
        else if ((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.imgPath) {
            console.log("Insite");
            const filePath = req.body.data.imgPath.slice(42, req.body.data.imgPath.length).replace(/%20/g, ' ');
            console.log("PATHHHHH", filePath);
            s3.deleteObject({ Bucket: "samskrithibucket", Key: filePath }, function (err, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err, err.stack);
                        return res.json({ success: false, message: "Deleting image failed" });
                    }
                    // error
                    else {
                        return res.json({ success: true, message: "Successfully deleted image" });
                    } // deleted
                });
            });
        }
        else {
            console.log("here");
            next();
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteFileS3 = deleteFileS3;
