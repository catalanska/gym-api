const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const classDBPath = path.join('db/classes.json');

exports.writeRecord = async function writeRecord(record) {
  const rawClassDB = await fsPromises.readFile(classDBPath);
  const classDB = JSON.parse(rawClassDB);
  classDB.push(record);

  await fsPromises.writeFile(classDBPath, JSON.stringify(classDB, null, 2));
};
