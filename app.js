import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import apiRoutes from './server/routes/apiRoutes';
import index from './server/routes/index';


dotenv.config();


// Express app setup
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// Morgan helps log all requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client/public')));

app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true
}));

// Require our routes into the application

apiRoutes(app);
index(app);

// Setup a default catch-all route that sends back a welcome message in JSON format
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome!!!'
}));

const port = parseInt(process.env.PORT, 10) || 8000;

if (!module.parent) {
  app.listen(port, () => {
    // console.log('Listening on port 8000...');
  });
}


export default app;
