<p align="center">
  <h3 align="center">GYM API</h3>
</p>


### Built using
* [node](https://nodejs.org/en/download/)
* [jest](https://jestjs.io/en/)
* [json schema](https://json-schema.org/)


<!-- GETTING STARTED -->
## Getting Started

For simplicity, this project does not use any database, just nodejs v12 to run. Data created is stored under `db/` folder

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

1. Run tests
```sh
npm test
```

2. Start the server locally. By default on port 1234
```sh
npm start
```
3. Launch your requests. A [Postman collection](https://github.com/catalanska/gym-api/tree/master/postman_collection.json) has been added to the repo to make the testing easier.

3.1 Create a new class
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
3.2 Create a new booking
```bash
curl --location --request POST 'http://localhost:1234/bookings' \
--header 'Content-Type: application/json' \
--data-raw '{
		"name": "Javier J",
		"date": "2020-10-10"
}'
```
