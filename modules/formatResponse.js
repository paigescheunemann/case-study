//Formats data returned by promises which comes through as array
const formatResponse = (data) => {
  let jsonResponse = {};

  //parse productInfo from redskyresponse to get title
  let productInfo = JSON.parse(data[0]);
  let name = productInfo.product.item.product_description.title;

  jsonResponse.title = name;

  //parse priceInfo for current price
  let price = data[1].current_price;
  jsonResponse.current_price = price;

  return jsonResponse;
};

module.exports = formatResponse;