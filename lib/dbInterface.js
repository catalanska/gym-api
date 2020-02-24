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
  const jsonData = await fsPromises.readFile(dbPath);
  let parsedData = JSON.parse(jsonData);
  if (Array.isArray(parsedData)) parsedData.push(record);
  else {
    parsedData = {
      ...record,
      ...parsedData,
    };
  }

  await fsPromises.writeFile(dbPath, JSON.stringify(parsedData, null, 2));
};
