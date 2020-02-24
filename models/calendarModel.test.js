const fs = require('fs');
const path = require('path');
const calendarModel = require('./calendarModel');

const fsPromises = fs.promises;
const dBPath = path.join('db/calendar.json');

describe('Calendar Model', () => {
  describe('#findCalendarEntry', () => {
    const date = '2020-01-01';
    const newCalendarEntry = {
      date,
      bookings: [],
      classId: 'foo',
    };

    beforeEach(async () => {
      await fsPromises.writeFile(dBPath, JSON.stringify({
        [date]: newCalendarEntry,
      }));
    });

    it('should find entry for 2020-01-01', async () => {
      const calendarEntry = await calendarModel.findCalendarEntry(date);
      expect(calendarEntry).toBeDefined();
    });

    it('should NOT find entry for 2020-01-02', async () => {
      const calendarEntry = await calendarModel.findCalendarEntry('2020-01-02');
      expect(calendarEntry).not.toBeDefined();
    });
  });

  describe('#storeCalendarEntry', () => {
    const date = '2020-01-01';
    const classId = 'bar';
    let calendarEntry;

    beforeEach(async () => {
      await fsPromises.writeFile(dBPath, JSON.stringify({}));
      calendarEntry = await calendarModel.storeCalendarEntry(date, classId);
    });

    it('create the proper object', async () => {
      expect(calendarEntry).toBeDefined();
    });

    it('persist entry in db', async () => {
      const calendarEntriesData = await fsPromises.readFile(dBPath);

      expect(JSON.parse(calendarEntriesData)[date]).toBeDefined();
    });
  });
});
