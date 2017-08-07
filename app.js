import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';
import apiRoutes from './server/routes/apiRoutes';

/**
 * configure dotenv to load env variables from .env file into process.env
 */
dotenv.config();

/**
 * Create an express application
 */
const app = express();

/**
 * webpackdevmiddleware serves the files emitted from webpack
 */
app.use(webpackMiddleware(webpack(webpackConfig)));

/**
 * Create new middleware to serve a favicon from the given path to a favicon file
 */
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));

/**
 * Morgan helps log all requests to the console
 */
app.use(logger('dev'));

/**
 * Parse incoming requests data
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Tells express where to serve static files
 */
app.use(express.static(path.join(__dirname, './client/public')));

/**
 * Use session middleware with the following options
 * secret: is used to sign the session id cookie
 * resave: forces the session to be saved back to the session store during requests
 * saveUninitialized: forces a session that is new but not modified to be saved to the stored
 */
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

/**
 * Require routes into the application
 */
app.use(apiRoutes);

/**
 * Delivers html file
 * It can be viewed at http://localhost:8000
 */
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

const port = parseInt(process.env.PORT, 10) || 8000;

/**
 * Checks if the parent object of running module is not listening to any port
 */
if (!module.parent) {
  app.listen(port);
}

export default app;
