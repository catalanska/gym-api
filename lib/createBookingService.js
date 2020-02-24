const calendarModel = require('../models/calendarModel');

exports.init = async function createClassService({ date, name }) {
  const calendarEntry = await calendarModel.findCalendarEntry(date);

  if (!calendarEntry) throw new Error('DateCanNotBeBooked');

  const updatedEntry = await calendarModel.addBooking(calendarEntry, name);
  return updatedEntry;
};
