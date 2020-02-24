exports.isValidDateRange = function isValidDateRange(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return (startDate <= endDate);
};
