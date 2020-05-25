# GeoMarket
Mini Market Data Bank to show Market location

## Prerequisites
Ensure you have the following installed on your local machine:
- [NodeJS V12](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org)

## Technologies

* Express - web framework
* Nodejs- Runtime Environment for Javascript.
* [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [supertest](https://github.com/visionmedia/supertest) - Test framework and other dependencies
* [nyc](https://www.npmjs.com/package/nyc) and [istanbul](https://github.com/istanbuljs/nyc) - for coverage test.
* [morgan](https://www.npmjs.com/package/morgan) - logging library

## Installation
To run the application on your local machine, please follow the guidelines below.
 - Install Nodejs on your machine
 - Clone the repository
 - cd into project folder
 - Install the dependencies and devDependencies
**Example**
```sh
>git clone https://github.com/Pomile/GeoMarket.git
>cd into GeoMarket
>npm install
```

## Development
Enter the command below in the project root directory to the run the app in a development enviroment. In this case you will need to download and use [Postman](https://www.getpostman.com/downloads/) to perfom your test.
Before you start the server in development make sure you do the following:
1. Follow installation guidelines
2. Install postgres
3. Create database for development (e.g geomarketDb)
4. create .env file and define your variables
```
    DB_USERNAME=xxxxxxxxx
    DB_PASSWORD=xxxxxxxxx
    DB_DEV_NAME=xxxxxxxxx
    DB_TEST_NAME=xxxxxxxxx
    DB_NAME=xxxxxxxxx
    DB_PORT=xxxxxxxxx
    DB_HOST=xxxxxxxxx
    PORT=xxxxxxxxx
    TOKEN_SECRET=xxxxxxxxx
    GOOGLE_GEOCODE_API=xxxxxxxxx
    CLOUDINARY_CLOUD_NAME=xxxxxxxxx
    CLOUDINARY_API_KEY=xxxxxxxxx
    CLOUDINARY_API_SECRET=xxxxxxxxx

```
3. Run the command below.

```sh
> npm run db:migrate
> npm run seed
Check database(e.g geomarketDb) to ensure all the tables are created, Then proceed
> npm run start:dev
```

## Endpoints

<table>
    <tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>
    <tr><td>POST</td> <td>api/v1/auth/signup</td><td>Create a user</td></tr>
    <tr><td>POST</td> <td>api/v1/auth/login</td><td>Login a user</td></tr>
    <tr><td>POST</td> <td>api/v1/auth/markets</td><td>Create a market</td></tr>
    <tr><td>POST</td> <td>api/v1/auth/markets</td><td>Add a market image</td></tr>
    <tr><td>PATCH</td> <td>api/v1/auth/markets/:id</td><td>Moidfy a market</td></tr>
    <tr><td>DELETE</td> <td>api/v1/auth/markets/:id</td><td>Delete a market</td></tr>
    <tr><td>GET</td> <td>api/v1/auth/markets</td><td>Get markets by name</td></tr>
    <tr><td>GET</td> <td>api/v1/auth/markets/:id</td><td>Get a market</td></tr>
<table>

## Author

Babatunde Ogedengbe

