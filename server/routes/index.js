// import express from 'express';

// const router = express.Router();

export default (app) => {
  app.get('*', (req, res) => {
    res.render('index', { title: 'PostIt' });
  });
};
