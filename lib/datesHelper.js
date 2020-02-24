function formattedDate(d) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${year}-${month}-${day}`;
}

function getDatesInPeriod({ startDate: startDateString, endDate: endDateString }) {
  const dates = [];
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  let currentDate = startDate;
  const addDays = function addDays(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(formattedDate(currentDate));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

exports.getDatesInPeriod = getDatesInPeriod;
