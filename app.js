const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.load({path: '.env.example'});
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Controllers (route handlers).
 */
const staticController = require('./controllers/staticController');

// Static Routes
app.get('/', staticController.index);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('App is running at http://localhost:%d in %s mode', port, app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});