require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./user');

// connect to database
mongoose.connect(process.env.MONGO_URI_PROD || process.env.MONGO_URI_DEV, { useNewUrlParser: true })

// check db connection
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function () {
  console.log("We're connected! " + mongoose.connection.readyState); //0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  // mongoose.connection.db.listCollections().toArray(function (err, colls) {
  //   console.log(colls);
  // });
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// get all users
app.get('/api/exercise/users', function (req, res) {
  UserModel.find({}, function (err, data) {
    if (err) return handleError(err);
    if (data) {
      let userList = [];
      for (let d of data) {
        userList.push({ "_id": d._id, "username": d.username })
      }
      res.json(userList)
    } else {
      res.send("There are no users registered");
    }
  });
});

// add new user
app.post('/api/exercise/new-user', async function (req, res) {
  const inputUsername = req.body.username;

  if (inputUsername) {
    const doc = await checkUsername(inputUsername);
    //if username already exists
    if (doc) {
      res.send("That Username is already taken");
    } else {
      // create new user
      const new_user = new UserModel({
        username: inputUsername
      });
      new_user.save(function (err, data) {
        if (err) return handleError(err);
        res.json({
          "username": data.username,
          "_id": data._id
        });
      });
    }
  } else {
    res.json({ "Error": "username is required" });
  }
});

// add new exercise
app.post('/api/exercise/add', async function (req, res) {
  const inputUserId = req.body.userId;
  const inputDesc = req.body.description;
  const inputDuration = req.body.duration;
  const inputDate = req.body.date;

  if (inputUserId && inputDesc && inputDuration) {
    //check userid exists
    UserModel.findById({ "_id": inputUserId }, function (err, doc) {
      // userid not in database
      if (!doc) {
        res.json({ "Error": "That userid does not exist" });
        // userid in database
      } else {
        // add new exercise to Log array
        doc.count += 1;
        // if input empty then set it to today date
        doc.log.push({
          "description": inputDesc,
          "duration": inputDuration,
          "date": inputDate ? inputDate : new Date()
        });
        doc.save(function (err, data) {
          const exerciseLog = data.log;
          const latestLog = exerciseLog[exerciseLog.length - 1];
          res.json({
            "username": data.username,
            "_id": data._id,
            "description": latestLog.description,
            "duration": latestLog.duration,
            "date": latestLog.date.toDateString()
          });
        });
      }
    });

  } else {
    res.setHeader('content-type', 'text/html');
    res.send("<p>There is missing data: </p>" + "<b>UserId:</b> " + inputUserId + "<br/><b>Description:</b> " + inputDesc + "<br/><b>Duration:</b> " + inputDuration);
  }
});

// get logs
app.route('/api/exercise/log').get(function (req, res, next) {
  const userid = req.query.userId;
  const from = req.query.from ? new Date(req.query.from) : new Date('1970-01-01');
  const to = req.query.to ? new Date(req.query.to) : new Date();
  const limit = req.query.limit;

  if (!userid) {
    res.json({ "Error": "A userId is required" });
  } else {
    UserModel.findOne({ "_id": userid }, function (err, user) {
      if (err) return next(err);
      // if userid not in database
      if (!user) {
        next({ "Message": "That userId does not exist" });
      } else {
        // if user has no logs
        if (user.count == 0) {
          next({ "Message": "This user has no exercise logs" });
        } else {
          let exerciseLogs = user.log;
          exerciseLogs = exerciseLogs
            .filter(d => (d.date >= from && d.date <= to))
            .map(item => ({
              description: item.description,
              duration: item.duration,
              date: item.date.toDateString()
            }));

          if (exerciseLogs >= limit) {
            exerciseLogs = exerciseLogs.slice(0, limit);
          }

          res.json({
            "_id": user._id,
            "username ": user.username,
            "count": exerciseLogs.length,
            "log": exerciseLogs
          });
        }
      }
    });
  }
}).post();


// function to check database for username
const checkUsername = function (name) {
  try {
    //const userInfo = UserModel.findOne({ "username": name });
    return UserModel.findOne({ "username": name });
  } catch (e) {
    console.log("e:  " + e);
  }
};


// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: 'Not Found' })
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})