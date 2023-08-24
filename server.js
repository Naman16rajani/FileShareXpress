require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { ensureAuthenticated } = require('./config/passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions))
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


const connectDB = require('./config/db');
connectDB();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", ensureAuthenticated, (req, res) => {
  const token = req.cookies.jwt;
  const isVerified = jwt.verify(token, jwtSecret);

  if (!isVerified) {
    res.render("signup", { message: 'Please login to continue' });
  }
  else {
    res.render("home")
  }
})
app.use('/auth', require('./routes/auth'));

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));