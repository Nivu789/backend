import moment from 'moment-timezone';

type DateTuple = [number, number, number, number, number, number];

export function convert(dates: string[], time: string[]): DateTuple[] {
    console.log(dates);
    console.log(time);
  
    function convertToDate(dateStr: string, timeStr: string): DateTuple {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const dateTimeStr = `${dateStr}T${timeStr}:00.000+05:30`; // Construct the date-time string with IST offset
      const date = moment.tz(dateTimeStr, 'Asia/Kolkata');
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

  
  // Output the result
  
  