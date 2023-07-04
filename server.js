const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'image',
});

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.post('/getImg', (req, res) => {
  try {
    const imageBase64 = req.body.file;
    const filename = req.body.fileName;

    pool.query(`INSERT INTO USER_IMAGES (iName, base64) VALUES ("${filename}", '${imageBase64}')`, (err, result) => {
      if (err) {
        throw err
      } else {
        console.log('Successed!');
        res.send({ ok: true });
      }
    })

  } catch (err) {
    console.log(err)
    res.send({
      ok: false,
      result: err
    });
  }
});

app.get('/imageslist', (req, res) => {
  pool.query(`SELECT iId, iName FROM user_images`, (err, result) => {
    if (err) {
      res.send({
        ok: false,
        result: err
      })
    }

    res.send({
      ok: true,
      result
    })
  });
})

app.get('/images/:fileId', (req, res) => {
  const uId = req.params.fileId;
  pool.query(`SELECT * FROM user_images where iId=${uId}`, (err, result) => {
    if (err) {
      res.send({
        ok: false,
        result: err
      })
    }
    console.log(result);
    res.send({
      ok: true,
      result
    })
  })
});



// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
    connection.release(); // Release the connection
  }
});


const port = process.env.PORT || 443;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});