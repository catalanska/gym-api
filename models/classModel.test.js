const classModel = require('./classModel');

const { findRecord, resetDB } = require('../lib/dbInterface');

describe('Class Model', () => {
  describe('#storeClass', () => {
    const newClassData = {
      name: 'Yoga Class Foo',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      capacity: 15,
    };

    beforeEach(async () => {
      await resetDB('classes');
    });

    afterAll(async () => {
      await resetDB('classes');
    });

    it('should store new class', async () => {
      const newClass = await classModel.storeClass(newClassData);

      const record = await findRecord('classes', newClass.id);

      expect(record).toBeDefined();
    });

    it('generates an ID for the created class', async () => {
      const newClass = await classModel.storeClass(newClassData);

      expect(newClass.id).toBeDefined();
    });
  });
});
