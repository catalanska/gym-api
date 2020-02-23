const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getDatesInPeriod } = require('../lib/datesHelper');

const fsPromises = fs.promises;
const classDBPath = path.join('db/classes.json');

function createClassDatesObject(classParams) {
  const bookingDates = getDatesInPeriod(classParams);
  const classDates = bookingDates.reduce((list, date) => {
    list[date] = { bookings: [] };
    return list;
  }, {});

  return classDates;
}

exports.storeClass = async function storeClass(classParams) {
  const newClassData = {
    id: uuidv4(),
    classDates: createClassDatesObject(classParams),
    ...classParams,
  };
  const rawClassDB = await fsPromises.readFile(classDBPath);
  const classDB = JSON.parse(rawClassDB);
  classDB.push(newClassData);

  await fsPromises.writeFile(classDBPath, JSON.stringify(classDB, null, 2));

  return Promise.resolve(newClassData);
};
