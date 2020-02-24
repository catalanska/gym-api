const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const getDbPath = (table) => path.join(`db/${table}.json`);

exports.findRecord = async function findRecord(table, record) {
  const dbPath = getDbPath(table);
  const jsonData = await fsPromises.readFile(dbPath);
  const parsedData = JSON.parse(jsonData);

  return parsedData[record];
};

exports.writeRecord = async function writeRecord(table, record) {
  const dbPath = getDbPath(table);
  const rawClassDB = await fsPromises.readFile(dbPath);
  const classDB = JSON.parse(rawClassDB);
  classDB.push(record);

  await fsPromises.writeFile(dbPath, JSON.stringify(classDB, null, 2));
};
