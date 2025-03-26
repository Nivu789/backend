import { Request, Response, NextFunction } from 'express';
import USER from '../models/userModel';
import jwt from 'jsonwebtoken'
import EVENT from '../models/eventModel';
import ANNOUNCEMENT from '../models/announcementModel';
import { sendMessage, getTextMessageInput } from '../helpers/messageHelper'
import twilio from 'twilio'


export const memberLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, password } = req.body.data
        console.log(phone)
        const user = await USER.findOne({ phone })
        console.log(user)
        if (user) {
            const token = jwt.sign({ phone }, process.env.JWT_SECRET || "")
            res.json({ message: "Welcome back", token: token })
        } else {
            res.json({ error: "You are not a member" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body.data
        const user = await USER.findOne({ username })
        if (user?.isAdmin && user.password === password) {
            const adminToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET || "")
            res.json({ message: "Welcome admin", adminToken: adminToken })
        } else {
            res.json({ error: "You are not an admin" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.showInHome) {
            const events = await EVENT.find({ showInHome: true })
            if (events) {
                res.json({ events })
            } else {
                res.json({ error: "Something went wrong" })
            }
        } else {

            const events = await EVENT.find({})
            if (events) {
                res.json({ events })
            } else {
                res.json({ error: "Something went wrong" })
            }
        }

    } catch (error) {
        console.log(error)
    }
}

export const getAnnouncementsUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const showAll = req.headers['x-show-all']

        if (showAll) {
            const announcements = await ANNOUNCEMENT.find({})
            if (announcements) {
                res.json({ announcements, success: true })
            } else {
                res.json({ error: "Something went wrong", succes: false })
            }


        } else {
            const announcements = await ANNOUNCEMENT.find({ showInHome: true })
            if (announcements) {
                res.json({ announcements, success: true })
            } else {
                res.json({ error: "Something went wrong", succes: false })
            }
        }


    } catch (error) {
        console.log(error)
    }
}


export const fetchEventsOfActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activityName } = req.body
        const actualName = activityName.charAt(0).toUpperCase() + activityName.slice(1)
        const eventData = await EVENT.find({ activity: actualName })
        if (eventData) {
            return res.json({ success: "true", eventData })
        } else {
            return res.json({ success: "false" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ message: "Something went wrong" })
    }
}

export const sendWhatsappMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        for (let i = 0; i < 3; i++) {
            const numbers = ["9778385740","8281650741","9846492483"]
            var data = getTextMessageInput(numbers[i] || "", 'Welcome to the Movie Ticket Demo App for Node.js!');

            sendMessage(data)
                .then(function (response) {
                    res.sendStatus(200);
                    console.log(response.statusText)
                    return;
                })
                .catch(function (error) {
                    console.log(error);
                    console.log(error.response.data);
                    res.sendStatus(500);
                    return;
                });
        }

    } catch (error) {
        console.log(error)
    }
}

