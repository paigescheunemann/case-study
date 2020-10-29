const https = require('https');

//fetch product details from redsky.target.com
const getProductData = (productId) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'redsky.target.com',
      path: `/v3/pdp/tcin/${productId}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&amp;key=candidate`,
    };
    const request = https.get(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Error fetching product details: ' + response.statusCode)
        );
      }
      const body = [];
      response.on('data', (chunk) => {
        body.push(chunk);
      });
      response.on('end', () => {
        resolve(body);
      });
    });
    request.on('error', (err) => {
      reject(`Error: ${err}`);
    });
  });
};

module.exports = getProductData;