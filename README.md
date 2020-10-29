# Case Study - MyRetail API

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast. myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

The goal for this exercise is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller. 

Your goal is to create a RESTful service that can retrieve product and price details by ID. The URL structure is up to you to define, but try to follow some sort of logical convention.

### Build an application that performs the following actions: 
- Responds to an HTTP GET request at /products/{id} and delivers product data as JSON (where {id} will be a number. 
Example product IDs: 13860428, 54456119, 13264003, 12954218) 
Example response: {"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}
- Performs an HTTP GET to retrieve the product name from an external API. (For this exercise the data will come from redsky.target.com, but let’s just pretend this is an internal resource hosted by myRetail) 
Example: https://redsky.target.com/v3/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate 
- Reads pricing information from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response. 
- BONUS: Accepts an HTTP PUT request at the same path (/products/{id}), containing a JSON request body similar to the GET response, and updates the product’s price in the data store. 

## Technology Used
- Nodejs
- Express
- MongoDB
- Docker

# Running the app
### Prerequisites 
- [Docker](https://www.docker.com/get-started) (includes Docker Compose on macOS)

### Starting and stopping the Docker containers
Docker-Compose will start the required containers with
```
docker-compose up
```

You may also run them in the background with 
```
docker-compose up -d
```

In this case you can stop running containers with
```
docker-compose down
```

Docker-Compose will start three containers: 
- `mongodb` 
- `case-study` 
- `mongo-seed`

The `mongo-seed` container serves to seed the mongo db with test data, then it will exit. If restarted, it will drop the data in the prices collection and re-insert.

### API Documentation
With the containers running, you can use the following requests to test locally:

**To make a GET request, use cURLs:** 

```
curl --location --request GET 'http://localhost:3000/products/13860428'
```
```
curl --location --request GET 'http://localhost:3000/products/54456119'
```
```
curl --location --request GET 'http://localhost:3000/products/13264003'
```
```
curl --location --request GET 'http://localhost:3000/products/12954218'
```

This will return a response in this format:

```
{
    "title": "The Big Lebowski (Blu-ray)",
    "current_price": {
        "currency_code": "USD",
        "value": "12.32"
    }
}
```

**To make a PUT request to update price, use cURL:**

```
curl --location --request GET 'http://localhost:3000/products/13860428' \
--header 'Content-Type: application/json' \
--data-raw '{"current_price":{"value":77.04,"currency_code":"USD"}}'
```

It can also parse JSON identical to the GET response 
```
curl --location --request GET 'http://localhost:3000/products/13860428' \
--header 'Content-Type: application/json' \
--data-raw '{"title":"The Big Lebowski (Blu-ray)","current_price":{"value":554.32,"currency_code":"USD"}}'
```

An invalid request (one missing price data or with non-numeric price data) will be rejected

# Development
### Prerequisites 
- [Docker](https://www.docker.com/get-started) (includes Docker Compose on macOS)
- [npm](https://www.npmjs.com/get-npm)
- [nvm](https://github.com/creationix/nvm) is useful for node version management

Clone this repository, then run
```
nvm use
npm install
```

Start the docker containers for local development with ``docker-compose up``

*Note*
For development without restarting the containers manually, change the `start` script in `package.json` to `nodemon index.js` - this will detect changes and reboot the app container autonmatically

## Future Plans
- Write Tests
- Improve price update validation to check valid currency codes and price formats based on international requirements
- Add more robust error handling/logging
- Device a monitoring/alerting solution
- Deploy App
