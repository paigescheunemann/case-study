const express = require('express');
const router = express.Router();
const priceService = require('../services/priceService');
const getProductData = require('../services/productService');
const formatResponse = require('../modules/formatResponse');

router.get('/:productId', (req, res, next) => {
  let id = req.params.productId;
  if (isNaN(id)) {
    res.status(400).json({Error: 'Invalid: non-numnerical product id'});
    return;
  }
  Promise.all([getProductData(id), priceService.getPriceData(id)])
    .then((data) => {
      let formattedData = formatResponse(data);
      res.send(formattedData);
    })
    .catch((err) => {
      res.send(err);
      next(err);
    });
});

router.put('/:productId', (req, res, next) => {
  let id = req.params.productId;
  if (isNaN(id)) {
    res.status(400).json({Error: 'Invalid: non-numerical product id'});
    return;
  }
  priceService.validatePriceData(req.body)
    .then((validatedData) => {
      priceService.updatePriceData(id, validatedData);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
      next(err);
    });
});

module.exports = router;
