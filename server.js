const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.post('/getImg', (req, res) => {

  try {
    const imageBase64 = req.body.file;
    const filename = req.body.fileName;
    const matches = imageBase64.match(/^data:image\/([a-z]+);base64,(.+)$/i);

    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const [, extension, data] = matches;

    const buffer = Buffer.from(data, 'base64');
    const filepath = `./imgs/${filename}.${extension}`;

    fs.writeFileSync(filepath, buffer);

    console.log(`Image saved as ${filepath}`);
    res.send({ok: true})

  } catch (err) {
    console.log(err)
    res.send({ok: false, ...err});
  }
})

const port = process.env.PORT || 443;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});