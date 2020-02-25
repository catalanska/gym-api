const calendarModel = require('./calendarModel');

const { resetDB, findRecord, writeRecord } = require('../lib/dbInterface');

describe('Calendar Model', () => {
  beforeEach(async () => {
    await resetDB('calendar');
  });

  afterAll(async () => {
    await resetDB('calendar');
  });

  describe('#findCalendarEntry', () => {
    it('should find entry for 2020-01-01', async () => {
      await writeRecord('calendar', {
        '2020-01-01': {
          bookings: [],
          classId: 'foo',
        },
      });

      const calendarEntry = await calendarModel.findCalendarEntry('2020-01-01');

      expect(calendarEntry).toBeDefined();
    });

    it('should NOT find entry for 2020-01-02', async () => {
      const calendarEntry = await calendarModel.findCalendarEntry('2020-01-02');

      expect(calendarEntry).not.toBeDefined();
    });
  });

  describe('#storeCalendarEntries', () => {
    const date = '2020-01-01';
    const classObject = { id: 'bar' };

    it('persist entry in db', async () => {
      await calendarModel.storeCalendarEntries([date], classObject);
      const calendarEntry = await findRecord('calendar', date);

      expect(calendarEntry).toBeDefined();
    });
  });

  describe('#areDatesAvailable', () => {
    const startDate = '2020-01-01';
    const endDate = '2020-01-02';

    it('returns true if there are no entries in the calendar for those dates', async () => {
      const areDatesAvailable = await calendarModel.areDatesAvailable(startDate, endDate);

      expect(areDatesAvailable).toBeTruthy();
    });

    it('returns false if there are entries in the calendar for those dates', async () => {
      await calendarModel.storeCalendarEntries([startDate], { id: 'foo' });

      const areDatesAvailable = await calendarModel.areDatesAvailable(startDate, endDate);

      expect(areDatesAvailable).toBeFalsy();
    });
  });

  describe('#addBooking', () => {
    const date = '2020-01-01';
    const entry = {
      date,
      bookings: [],
      classId: 'foo',
    };

    it('should find entry for 2020-01-01', async () => {
      await writeRecord('calendar', {
        [date]: entry,
      });

      await calendarModel.addBooking(entry, 'Javier J');
      const calendarEntry = await calendarModel.findCalendarEntry(date);

      expect(calendarEntry.bookings.length).toBe(1);
    });
  });
});
