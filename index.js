const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const productsRouter = require('./routes/products');
const mongoose = require('mongoose');

// this is our MongoDB database
const dbUrl = 'mongodb://mongodb:27017/test';

// connects our back end code with the database
mongoose.connect(dbUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false 
});
let db = mongoose.connection;

// connect to the database
db.once('open', () => console.log('Connected to mongodb'));

app.use(bodyParser.json());

//define routes
app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Retail Case Study');
});

app.listen(port, () => {
  console.log(`Retail Case Study listening at http://localhost:${port}`);
});
