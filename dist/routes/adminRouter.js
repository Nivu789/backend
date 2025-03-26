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
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminAuth_1 = require("../middlewares/adminAuth");
const adminController_1 = require("../controllers/adminController");
const s3Upload_1 = require("../middlewares/s3Upload");
const { S3Client } = require('@aws-sdk/client-s3');
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const listFilesInS3_1 = require("../middlewares/listFilesInS3");
const fileUploadS3_1 = require("../middlewares/fileUploadS3");
const deleteFileS3_1 = require("../middlewares/deleteFileS3");
const galleryModel_1 = __importDefault(require("../models/galleryModel"));
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post('/post-event', adminAuth_1.adminAuth, s3Upload_1.s3Upload, adminController_1.postEvent);
exports.adminRouter.get('/get-events', adminAuth_1.adminAuth, adminController_1.getEvents);
exports.adminRouter.get('/get-event-info/:id', adminAuth_1.adminAuth, adminController_1.getEventInfo);
exports.adminRouter.post('/post-edited-event/:id', adminAuth_1.adminAuth, s3Upload_1.s3Upload, adminController_1.editEventInfo);
exports.adminRouter.post('/remove-event/:id', adminAuth_1.adminAuth, adminController_1.removeEvent);
exports.adminRouter.post('/gallery-folders', adminAuth_1.adminAuth, listFilesInS3_1.listFilesInS3);
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: 'samskrithibucket',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            console.log("Here", req);
            const folderName = req.body.folderName;
            const rootfolder = req.body.rootFolder;
            cb(null, `${rootfolder ? rootfolder : 'gallery'}/${folderName}/${Date.now().toString()}_${file.originalname}`);
        }
    })
});
exports.adminRouter.post('/gallery-upload', upload.array('photos'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        if (req.body.createdDate) {
            yield galleryModel_1.default.create({
                folderName: req.body.folderName,
                dateCreated: req.body.createdDate
            });
        }
        if (req.files) {
            res.send('Successfully uploaded ' + req.files.length + ' files!');
        }
        else {
            res.status(400).send('No files uploaded.');
        }
    });
});
exports.adminRouter.post('/post-announcement', fileUploadS3_1.fileUploadS3, adminController_1.postAnnouncement);
exports.adminRouter.post('/edit-announcement', fileUploadS3_1.fileUploadS3, adminController_1.editAnnouncement);
exports.adminRouter.post('/delete-announcement', deleteFileS3_1.deleteFileS3, adminController_1.deleteAnnouncement);
exports.adminRouter.post('/delete-file', deleteFileS3_1.deleteFileS3);
exports.adminRouter.post('/delete-committee-image', deleteFileS3_1.deleteFileS3);
exports.adminRouter.get('/get-announcements', adminController_1.getAnnouncements);
exports.adminRouter.get('/get-gallery-folders', adminController_1.getGalleryFolders);
exports.adminRouter.delete('/delete-folder', adminController_1.deleteGalleryFolder);
