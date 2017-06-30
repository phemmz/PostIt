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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _apiRoutes = require('./server/routes/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

var _index = require('./server/routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// Express app setup
var app = (0, _express2.default)();
// view engine setup
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// Morgan helps log all requests to the console
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, './client/public')));

app.use((0, _expressSession2.default)({
  secret: 'hello',
  resave: false,
  saveUninitialized: true
}));

// Require our routes into the application

(0, _apiRoutes2.default)(app);
(0, _index2.default)(app);

// Setup a default catch-all route that sends back a welcome message in JSON format
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome!!!'
// }));

var port = parseInt(process.env.PORT, 10) || 8000;

if (!module.parent) {
  app.listen(port, function () {
    console.log('Listening on port 8000...');
  });
}

exports.default = app;