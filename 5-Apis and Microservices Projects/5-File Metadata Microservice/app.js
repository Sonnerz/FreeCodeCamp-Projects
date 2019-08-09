//https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    //cb(null, file.fieldname + '-' + Date.now())
    cb(null, "fcc" + '-' + "testFile")
  }
})
const upload = multer({ storage: storage })

//get file metadata
app.post("/api/fileanalyse", upload.single('upfile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    //const error = new Error('Please upload a file')
    //error.httpStatusCode = 400
    res.send("Please upload a file")
    //return next(error)
  }
  res.json({
    "name": file.originalname,
    "type": file.mimetype,
    "size": file.size
  })
})

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

module.exports = app;
