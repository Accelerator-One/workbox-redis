// Environment dependencies
const express = require('express');
const session = require('express-session');
const path = require('path');

// Initialization
let app = new express();
require('dotenv').config();

// Port setup
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on port: " + port);
});

// SSR [ Client-side caching with workbox ]
app.use('/', express.static(path.join(__dirname, 'public')));

// Redis store
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient(process.env.ENDPOINT);

// Session setup [ Uncomment cookies below over HTTPS connection ]
app.use(session({
  secret: process.env.SECRET,
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    // httpOnly: true,
    // sameSite: 'strict',
    maxAge: 3600
  }
}));

// Endpoint(s)
app.get('/rate', (req, res) => {

  if (req.session.limit !== undefined && Date.now() - req.session.limit <= process.env.RATE) {
    res.status(429).send("");
    return;
  }

  req.session.limit = Date.now();
  res.status(200).send("");

});
