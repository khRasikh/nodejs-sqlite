const express = require('express');
const app = express();
const port = 3000;
//functions
const {
  latestRates,
  storeRates,
  updateRates,
  fetchRates,
  deleteRate,
  deleteAllRates,
} = require('./rates/functions.js');
//swagger UI
const customizedSwaggerUI = require('./swagger.js');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//urls
app.use('/', swaggerUi.serve, swaggerUi.setup(customizedSwaggerUI));
app.post('/api/rate', storeRates);
app.get('/api/rates', fetchRates);
app.get('/api/rate/now', latestRates);
app.put('/api/rate/:id', updateRates);
app.delete('/api/rate/:id', deleteRate);
app.delete('/api/rates', deleteAllRates);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
