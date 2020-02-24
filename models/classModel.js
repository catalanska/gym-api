const { v4: uuidv4 } = require('uuid');
const { getDatesInPeriod } = require('../lib/datesHelper');
const { isValidDateRange } = require('../lib/validators');
const { writeRecord } = require('../lib/dbInterface');

function validateClassParams(classParams) {
  const { startDate, endDate } = classParams;
  if (!isValidDateRange(startDate, endDate)) throw new Error('Invalid dates');
}

function createClassDatesObject(classParams) {
  const bookingDates = getDatesInPeriod(classParams);
  const classDates = bookingDates.reduce((list, date) => {
    list[date] = { bookings: [] };
    return list;
  }, {});

  return classDates;
}

exports.storeClass = async function storeClass(classParams) {
  validateClassParams(classParams);

  const newClassData = {
    id: uuidv4(),
    classDates: createClassDatesObject(classParams),
    ...classParams,
  };

  await writeRecord(newClassData);

  return Promise.resolve(newClassData);
};
