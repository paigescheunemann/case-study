const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  current_price: {
    value: {
      type: String,
      required: true
    },
    currency_code: {
      type: String,
      required: true
    }
  }
});

module.exports.Prices = mongoose.model('Prices', pricesSchema);