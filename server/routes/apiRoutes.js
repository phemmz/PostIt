import express from 'express';
import AccountController from './../controllers/accountController';
import GroupController from './../controllers/groupController';
import MessageController from './../controllers/messageController';
import UserController from './../controllers/userController';
import SignupValidations from '../controllers/middlewares/signupMiddleware';
import SigninValidations from '../controllers/middlewares/signinMiddleware';
import CreateGroupValidations from '../controllers/middlewares/createGroupMiddleware';
import AddUserValidations from '../controllers/middlewares/addUserMiddleware';
import SendMessageValidations from '../controllers/middlewares/sendMessageMiddleware';

const router = express.Router();

router.get('/api/user', AccountController.getAll);
router.post('/api/user/signup', SignupValidations.validateUserInput, AccountController.signup);
router.post('/api/user/signin', SigninValidations.validateUserInput, AccountController.signin);
router.post('/api/group', CreateGroupValidations.validateUserInput, GroupController.createGroup);
router.get('/api/group', UserController.getGroup);
router.post('/api/group/:groupId/message', SendMessageValidations.validateUserInput, MessageController.sendMessage);
router.get('/api/group/:groupId/messages', MessageController.getMessages);
router.post('/api/group/:groupId/user', AddUserValidations.validateUserInput, UserController.addUser);

export default router;
