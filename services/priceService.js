const { Prices } = require('../models/prices');

//get price data for a product in mongo db
const getPriceData = (productId) => {
  return new Promise((resolve, reject) => {
    const prices = Prices.findOne({ id: productId });
    if (prices) {
      resolve(prices);
    } else {
      reject('Error retrieving prices');
    }
  });
};

//update price data
const updatePriceData = (productId, newPrice) => {
  return new Promise((resolve, reject) => {
    const filter = { id: productId};
    const update = { current_price: newPrice };
    Prices.findOneAndUpdate(filter, update, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// ensure that price data is valid. Default to USD if currency_code is missing. 
// This should be expanded to better check the accuracy of price formatting, but that will depend on the requirements for international number formats and currencies
const validatePriceData = (priceData) => {
  return new Promise((resolve, reject) => {
    let newPriceData = {};
    if (
      priceData.current_price.value && !isNaN(Number(priceData.current_price.value))
    ) {
      newPriceData.currency_code = priceData.current_price.currency_code || 'USD';
      newPriceData.value = Number(priceData.current_price.value).toFixed(2);
      resolve(newPriceData);
    } else {
      reject('Invalid Request');
    }
  });
};

module.exports = { getPriceData, updatePriceData, validatePriceData };
