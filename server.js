require('dotenv').config();

const
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/react-express-jwt',
    PORT = process.env.PORT || 3002,
    usersRoutes = require('./routes/users.js'),
    cors = require('cors'),
    breweriesRoutes = require('./routes/breweries.js'),
    axios = require('axios'),
    path= require ('path');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    console.log(err || `Connected to mLab`)
})

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")))
app.get('/api', (req,res) => {
    res.json({ message: "API ROOT" })
});


app.use('/api/users', usersRoutes);
app.use('/api/breweries', breweriesRoutes);


app.get('/test', (req, res) => {
    // axios('http://api.brewerydb.com/v2/locations/?key=e64cdf34c138b3ad00ce4a5de938d8f1')
    axios('xhttps://api.foursquare.com/v2/venues/search?client_id=KHATSZ4BVM2SCHQ4EXXWDA5Y1JR0TPWWYEGKCWWKQWEWAC0T&client_secret=4FQH0UFQ4OHG30FE3YEOS3I4ITAJM1QXV01EGMY5ZREFBP1Y&v=20180323&limit=100&ll=34.0522,-118.2437&query=brewery')
        .then(response => { 
            res.json(response.data)
        })
        .catch(err => {
            debugger
        })
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`)
});