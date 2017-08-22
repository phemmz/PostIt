'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _apiRoutes = require('./server/routes/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * configure dotenv to load env variables from .env file into process.env
 */
_dotenv2.default.config();

/**
 * Create an express application
 */
var app = (0, _express2.default)();

/**
 * Create new middleware to serve a favicon from the given path to a favicon file
 */
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'client', 'favicon.ico')));

/**
 * Morgan helps log all requests to the console
 */
app.use((0, _morgan2.default)('dev'));

/**
 * Parse incoming requests data
 */
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

/**
 * Tells express where to serve static files
 */
app.use(_express2.default.static(_path2.default.join(__dirname, './client/public')));

/**
 * Use session middleware with the following options
 * secret: is used to sign the session id cookie
 * resave: forces the session to be saved back to the session store during requests
 * saveUninitialized: forces a session that is new but not modified to be saved to the stored
 */
app.use((0, _expressSession2.default)({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

/**
 * Require routes into the application
 */
app.use(_apiRoutes2.default);

/**
 * Delivers html file
 * It can be viewed at http://localhost:8000
 */
app.get('/*', function (req, res) {
  res.sendFile(_path2.default.resolve('./views/index.html'));
});

var port = parseInt(process.env.PORT, 10) || 8000;

/**
 * Checks if the parent object of running module is not listening to any port
 */
if (!module.parent) {
  app.listen(port);
}

exports.default = app;