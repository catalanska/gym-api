const classModel = require('../models/classModel');
const calendarModel = require('../models/calendarModel');
const { getDatesInPeriod } = require('./datesHelper');
const { isValidDateRange, areDatesAvailable } = require('./validators');

const invalidDatesError = new Error('Invalid dates');
const unavailableDatesError = new Error('Unavailable dates');

async function createCalendarEntries(classObject) {
  const { startDate, endDate } = classObject;
  const dates = getDatesInPeriod({ startDate, endDate });

  await calendarModel.storeCalendarEntries(dates, classObject);
}

async function validateClassParams(classParams) {
  const { startDate, endDate } = classParams;
  if (!isValidDateRange(startDate, endDate)) throw invalidDatesError;

  const datesAvailable = await areDatesAvailable(startDate, endDate);
  if (!datesAvailable) throw unavailableDatesError;
}

exports.init = async function createClassService(classParams) {
  await validateClassParams(classParams);
  const newClass = await classModel.storeClass(classParams);
  await createCalendarEntries(newClass);

  return newClass;
};
