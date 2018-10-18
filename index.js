// FileName: index.js
// Import express
let express = require('express');
const config=require('./config/database');
const apirouter=require('./api-router/api-router');
const bodyparser=require('body-parser');
 const mongoose=require('mongoose');
 let app = express();
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

// Initialize the app

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('http://trekondev.azurewebsites.net/api/users'));
app.use('/api',apirouter);
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});