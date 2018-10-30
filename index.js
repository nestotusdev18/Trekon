// FileName: index.js
// Import express
let express = require('express');
const config=require('./config/database');
const apirouter=require('./api-router/api-router');
const bodyparser=require('body-parser');
const session = require('express-session');
const passport = require('passport');
 const mongoose=require('mongoose');
const app = express();
 mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Initialize the app

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('http://trekondev.azurewebsites.net/api/users'));
app.use('/api/',apirouter);
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});