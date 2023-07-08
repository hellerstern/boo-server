const express = require("express");

// IMPORT DB OBJECT
const DB_OBEJCT = require("../dbconnect");
const app = express();

app.post('/getImg', (req, res) => {
  try {
    const imageBase64 = req.body.file;
    const filename = req.body.fileName;

    DB_OBEJCT.query(`INSERT INTO USER_IMAGES (iName, base64) VALUES ("${filename}", '${imageBase64}')`, (err, result) => {
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
  DB_OBEJCT.query(`SELECT iId, iName FROM user_images`, (err, result) => {
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
  DB_OBEJCT.query(`SELECT * FROM user_images where iId=${uId}`, (err, result) => {
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

module.exports = app;