"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function convert(dates, time) {
    console.log(dates);
    console.log(time);
    function convertToDate(dateStr, timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const dateTimeStr = `${dateStr}T${timeStr}:00.000+05:30`; // Construct the date-time string with IST offset
        const date = moment_timezone_1.default.tz(dateTimeStr, 'Asia/Kolkata');
        const year = date.year();
        const month = date.month();
        const day = date.date();
        return [year, month, day, hours, minutes, 0];
    }
    // Convert dates and times
    const startDateTuple = convertToDate(dates[0], time[0]);
    const endDateTuple = convertToDate(dates[1], time[1]);
    return [startDateTuple, endDateTuple];
}
exports.convert = convert;
// Output the result
