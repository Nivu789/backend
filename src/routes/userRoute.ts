import express from 'express'
import { adminLogin, fetchEventsOfActivity, getAnnouncementsUser, getEvents, memberLogin, sendWhatsappMessage } from '../controllers/userController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { fetchCommitteeImagesFromS3 } from '../middlewares/fetchCommitteeImagesFromS3'
import { fetchActivityImagesFromS3 } from '../middlewares/fetchActivityImagesFromS3'


export const userRouter = express.Router()

userRouter.post('/login',authMiddleware,memberLogin)

userRouter.post('/login-admin',adminLogin)

userRouter.get('/auth',authMiddleware)

userRouter.get('/events',getEvents)

userRouter.get('/get-announcements',getAnnouncementsUser)

userRouter.post('/fetch-committee-images',fetchCommitteeImagesFromS3)

userRouter.post('/get-activity-events',fetchEventsOfActivity)

userRouter.post('/fetch-activity-images',fetchActivityImagesFromS3)


userRouter.post('/get-message',sendWhatsappMessage)