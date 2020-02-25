const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const getDbPath = (table) => path.join(`db/${process.env.NODE_ENV}/${table}.json`);

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function getData(table) {
  const dbPath = getDbPath(table);
  const jsonData = await readFile(dbPath);
  let parsedData;
  try {
    parsedData = JSON.parse(jsonData);
  } catch (e) {
    console.log(e)
    console.log(jsonData)

    parsedData = JSON.parse(jsonData);
  }
  return parsedData;
}

exports.findRecord = async function findRecord(table, record) {
  const data = await getData(table);

  return data[record];
};

exports.findRecords = async function findRecords(table, items) {
  const data = await getData(table);

  const fn = function find(v) {
    return data[v];
  };

  const filterFn = function find(v) {
    return v !== undefined;
  };

  return items.map(fn).filter(filterFn);
};

exports.writeRecord = async function writeRecord(table, record) {
  let data = await getData(table);

  data = {
    ...record,
    ...data,
  };

  await fsPromises.writeFile(getDbPath(table), JSON.stringify(data, null, 2));
};

exports.writeRecords = async function writeRecords(table, records) {
  let data = await getData(table);
  data = Object.assign({}, data, ...records);

  await fsPromises.writeFile(getDbPath(table), JSON.stringify(data, null, 2));
};

exports.updateRecord = async function updateRecord(table, key, record) {
  const data = await getData(table);
  data[key] = record;

  await fsPromises.writeFile(getDbPath(table), JSON.stringify(data, null, 2));
};


exports.resetDB = async function resetDB(table) {
  await fsPromises.writeFile(getDbPath(table), JSON.stringify({}));
};
