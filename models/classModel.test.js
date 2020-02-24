const fs = require('fs');
const path = require('path');
const classModel = require('./classModel');

const fsPromises = fs.promises;
const classDBPath = path.join('db/classes.json');

describe('Class Model', () => {
  describe('#storeClass', () => {
    const newClassData = {
      name: 'Yoga Class Foo',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      capacity: 15,
    };

    beforeEach(async () => {
      await fsPromises.writeFile(classDBPath, JSON.stringify([]));
    });

    it('should store new class', async () => {
      await classModel.storeClass(newClassData);

      const classesData = await fsPromises.readFile(classDBPath);

      expect(JSON.parse(classesData).length).toBe(1);
    });

    it('generates an ID for the created class', async () => {
      const newClass = await classModel.storeClass(newClassData);

      expect(newClass.id).toBeDefined();
    });

    it('initializes the bookings for that class', async () => {
      const newClass = await classModel.storeClass(newClassData);

      expect(newClass.classDates).toEqual(expect.any(Object));
    });

    it('throws an Error if the given range of dates is invalid', () => {
      classModel.storeClass({
        ...newClassData,
        endDate: '2019-01-01',
      })
        .catch((error) => {
          expect(error).toEqual(new Error('Invalid dates'));
        });
    });
  });
});
