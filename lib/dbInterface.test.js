const { findRecords, resetDB, writeRecords } = require('../lib/dbInterface');

const table = 'calendar';

describe('dbInterface', () => {
  beforeEach(async () => {
    await resetDB('classes');
    await resetDB('calendar');
  });

  afterAll(async () => {
    await resetDB('classes');
    await resetDB('calendar');
  });

  describe('#findRecords', () => {
    beforeEach(async () => {
      await writeRecords('calendar', [
        { '2020-01-01': {} },
        { '2020-01-02': {} },
        { '2020-01-03': {} },
      ]);
    });

    it('should return found entries', async () => {
      const result = await findRecords(table, ['2020-01-01', '2020-01-05']);
      expect(result).toEqual([expect.any(Object)]);
    });
  });
});
