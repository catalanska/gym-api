<p align="center">
  <h3 align="center">GYM API 🏋️</h3>
</p>


## Built using
* [nodejs](https://nodejs.org/en/download/) as programming language
* [expressjs](https://github.com/expressjs/express) as web framework
* [jest](https://jestjs.io/en/) as testing framework
* [json schema](https://json-schema.org/) to annotate and validate endpoints

## Context

The service offers 2 enpoints `/classes` (to create a class) and `/bookings` (to make a reservation)

There can only be one class per day and there is no problem with overbooking for now.

### JSON schema
[JSON schema](https://json-schema.org/) has been added to:
* Easily document data models and endpoints  
* Enforce some standard for the Restful API
* Help on validation of request and ensure coherent responses

Schemas can be found [here](https://github.com/catalanska/gym-api/tree/master/public/schemas)


### Database

For simplicity, this project does not use any database. Data created is stored in a json file under `db/` folder. two models are stored `class`and `calendar`. Both are key-value databases, to enable quick find and insert operations.

When a class is created, its stored in db/ENV/classes.json like
```
"2486c321-4114-4965-b30c-f21ec39e62b7": {
  "id": "2486c321-4114-4965-b30c-f21ec39e62b7",
  "name": "Yoga",
  "startDate": "2020-01-01",
  "endDate": "2020-01-02",
  "capacity": 10
}
```
Also, one entry per each date is created in the db/ENV/calendar.json . in the previous example, the class created had a duration of 2 days. The calendar entries look like:
```
"2020-01-01": {
  "date": "2020-01-01",
  "bookings": [],
  "classId": "2486c321-4114-4965-b30c-f21ec39e62b7"
},
"2020-01-02": {
  "date": "2020-01-02",
  "bookings": [],
  "classId": "2486c321-4114-4965-b30c-f21ec39e62b7"
}
```
If I make a booking for just the second date, that entry will change to:

```
"2020-01-02": {
  "date": "2020-01-02",
  "bookings": [
    "Javier J"
  ],
  "classId": "2486c321-4114-4965-b30c-f21ec39e62b7"
}
```

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* nodejs v12 [download](https://nodejs.org/en/download/)
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
2. Install NPM packages
```sh
npm install
```

<!-- USAGE EXAMPLES -->
## Usage

1. Start the server locally. By default on port 1234
```sh
npm start
```
2. Launch your requests. A [Postman collection](https://github.com/catalanska/gym-api/tree/master/postman_collection.json) has been added to the repo to make the testing easier.

  2.1 Create a new class

  ```bash
  curl --location --request POST 'http://localhost:1234/classes' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  		"name": "Yoga",
  		"startDate": "2020-10-10",
  		"endDate": "2020-10-10",
  		"capacity": 10
  }'
  ```

  2.2 Create a new booking

  ```bash
  curl --location --request POST 'http://localhost:1234/bookings' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  		"name": "Javier J",
  		"date": "2020-10-10"
  }'
  ```

## Tests
The code has been tested up to a 99% of coverage. To run the tests, just type

```sh
npm test
```
Here the output produced, which shows the use cases considered.

```
PASS  models/calendarModel.test.js
 Calendar Model
   #findCalendarEntry
     ✓ should find entry for 2020-01-01 (13ms)
     ✓ should NOT find entry for 2020-01-02 (1ms)
   #storeCalendarEntries
     ✓ persist entry in db (2ms)
   #areDatesAvailable
     ✓ returns true if there are no entries in the calendar for those dates (3ms)
     ✓ returns false if there are entries in the calendar for those dates (2ms)
   #addBooking
     ✓ should find entry for 2020-01-01 (4ms)

PASS  controllers/bookingsController.test.js
 POST /bookings
   ✓ should return 400 when request does not match Schema (56ms)
   ✓ should return 422 when booking is not available (7ms)
   ✓ should return 200 when booking has been created (5ms)
   ✓ should return 500 when booking could not be created (4ms)

PASS  controllers/classesController.test.js
 POST /classes
   ✓ should return 400 when request does not match Schema (7ms)
   ✓ should return 422 when validation of dates fail (3ms)
   ✓ should return 422 when another class is registered for  the given dates (8ms)
   ✓ should return 500 when class could not be created (6ms)
   ✓ should return 200 when class has been created (14ms)

PASS  server/index.test.js
 Available endpoints
   ✓ should return 404 when endpoint does not exist (10ms)
   ✓ should not return 404 for existing POST /classes endpoint (4ms)
   ✓ should not return 404 for existing POST /bookings endpoint (3ms)

PASS  lib/dbInterface.test.js
 dbInterface
   #findRecords
     ✓ should return found entries (4ms)

PASS  models/classModel.test.js
 Class Model
   #storeClass
     ✓ should store new class (4ms)
     ✓ generates an ID for the created class (3ms)

```
