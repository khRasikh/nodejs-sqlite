const fetch = require('node-fetch');
const db = require('./rates.db.js');

const storeRates = async (req, res) => {
  const response = await fetch('https://open.er-api.com/v6/latest');
  const currencies = await response.json();
  // const updated_at = new Date(currencies.time_next_update_utc).toLocaleString(); //to be used in production
  // const created_at = new Date(currencies.time_last_update_utc).toLocaleString(); //to be used in production
  var sql = `INSERT INTO rate (BASE_CODE, USD, EUR, GBP, CNY, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  var params = [
    currencies.base_code,
    currencies.rates.USD,
    currencies.rates.EUR,
    currencies.rates.GBP,
    currencies.rates.CNY,
    new Date().toLocaleString(),
    new Date().toLocaleString(),
  ];
  let errors = [];
  if (params.length < 4) {
    errors.forEach((e) => {
      errors.push('No ' + e + ' is spefied!');
    });
  } else if (errors.length) {
    res.status(400).json({ error: errors.join(',') });
    return;
  } else {
    //create record
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: currencies.result,
        id: this.lastID,
      });
    });
  }
};

const fetchRates = async (req, res) => {
  var sql = 'select * from rate';
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
};

const latestRates = (req, res, next) => {
  var sql = 'SELECT * FROM rate ORDER BY id DESC LIMIT 1';
  db.get(sql, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
};
const updateRates = (req, res, next) => {
  const { BASE_CODE, USD, EUR, GBP, CNY, updated_at } = req.body;
  db.run(
    `UPDATE rate set 
         BASE_CODE = COALESCE(?,BASE_CODE), 
         USD = COALESCE(?,USD), 
         EUR = COALESCE(?,EUR), 
         GBP = COALESCE(?,GBP), 
         CNY = COALESCE(?,CNY), 
         updated_at = COALESCE(?,updated_at) 
         WHERE id = ?`,
    [BASE_CODE, USD, EUR, GBP, CNY, updated_at, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: 'success',
        data: { BASE_CODE, USD, EUR, GBP, CNY, updated_at },
        changes: this.changes,
      });
    }
  );
};

const deleteRate = (req, res, next) => {
  db.run(
    'DELETE FROM rate WHERE id = ?',
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: 'deleted', changes: this.changes });
    }
  );
};

module.exports = {
  storeRates,
  fetchRates,
  latestRates,
  updateRates,
  deleteRate,
};
