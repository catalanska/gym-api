const {
  findRecord, findRecords, writeRecords, updateRecord,
} = require('../lib/dbInterface');
const { getDatesInPeriod } = require('../lib/datesHelper');

const tableName = 'calendar';

exports.addBooking = async function updateEntry(entry, bookingName) {
  entry.bookings.push(bookingName);

  await updateRecord(tableName, entry.date, entry);
  return entry;
};

exports.findCalendarEntry = async function findCalendarEntry(dateString) {
  const entry = await findRecord(tableName, dateString);
  return entry;
};

exports.storeCalendarEntries = async function storeCalendarEntries(dates, classObject) {
  const entries = await Promise.all(dates.map(async (date) => ({
    [date]: {
      date,
      bookings: [],
      classId: classObject.id,
    },
  })));

  await writeRecords(tableName, entries);
};

exports.areDatesAvailable = async function areDatesAvailable(startDate, endDate) {
  const dates = getDatesInPeriod({ startDate, endDate });
  const records = await findRecords(tableName, dates);

  return records.length === 0;
};
