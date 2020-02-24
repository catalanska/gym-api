const { v4: uuidv4 } = require('uuid');
const { writeRecord } = require('../lib/dbInterface');

const tableName = 'classes';

exports.storeClass = async function storeClass(classParams) {
  const id = uuidv4();

  const newClass = {
    id,
    ...classParams,
  };

  await writeRecord(tableName, { [id]: newClass });

  return newClass;
};
