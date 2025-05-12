const express = require('express');
const app = express();
const port = 3000;

// Feature toggle: Set via environment variable
const enableCustomerBFeature = process.env.ENABLE_CUSTOMER_B_FEATURE === 'true';

// Middleware to identify customer with queryparam
app.use((req, res, next) => {
  req.customer = req.query.customer || 'A';
  next();
});

app.get('/', (req, res) => {
  if (req.customer === 'B' && enableCustomerBFeature) {
    res.send('You are valuable customer B');
  } else {
    res.send('hello world');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});