require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
});

const sql = "INSERT INTO fba (sku) VALUES ?";
const query = util.promisify(conn.query).bind(conn);

app.post('/values', async function(req, res) {
  try {
    const insert = await query(sql, req.body.values);
    res.send(insert);
  } catch (err) {return err};
});

app.listen(process.env.API_PORT, () => {
  console.info('Listening on port 9000');
});
