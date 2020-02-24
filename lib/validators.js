const calendarModel = require('../models/calendarModel');

exports.isValidDateRange = function isValidDateRange(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return (startDate <= endDate);
};

exports.areDatesAvailable = async function areDatesAvailable(startDate, endDate) {
  return calendarModel.areDatesAvailable(startDate, endDate);
};
