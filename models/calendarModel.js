const { findRecord, writeRecord } = require('../lib/dbInterface');

const tableName = 'calendar';

exports.findCalendarEntry = async function findCalendarEntry(dateString) {
  const entry = await findRecord(tableName, dateString);
  return entry;
};

exports.storeCalendarEntry = async function findCalendarEntry(dateString, classObject) {
  const entry = {
    [dateString]: {
      date: dateString,
      bookings: [],
      classId: classObject.id,
    },
  };
  await writeRecord(tableName, entry);

  return entry;
};
