import express from 'express';
import AccountCtrl from './../controllers/accountController';
import GroupCtrl from './../controllers/groupController';
import MessageCtrl from './../controllers/messageController';
import UserCtrl from './../controllers/userController';

// const express = require('express');
// const Account = require('../data/models').Account;
// const Group = require('../data/models').Group;
const router = express.Router();

router.post('/api/user/signup', AccountCtrl.signup);
router.post('/api/user/signin', AccountCtrl.signin);
router.post('/api/group', GroupCtrl.createGroup);
router.get('/api/group', GroupCtrl.getGroup);
router.post('/api/group/:groupId/message', MessageCtrl.sendMessage);
router.get('/api/group/:groupId/messages', MessageCtrl.getMessages);
router.post('/api/group/:groupId/user', UserCtrl.addUser);
// GroupCtrl.createGroup);

export default router;
