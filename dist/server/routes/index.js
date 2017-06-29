'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// import express from 'express';

// const router = express.Router();

exports.default = function (app) {
  app.get('*', function (req, res) {
    res.render('index', { title: 'PostIt' });
  });
};