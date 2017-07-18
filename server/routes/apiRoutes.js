import express from 'express';
import UserController from './../controllers/accountController';
import GroupController from './../controllers/groupController';
import MessageController from './../controllers/messageController';
// import UserController from './../controllers/userController';
import SignupValidations from '../controllers/middlewares/signupMiddleware';
import SigninValidations from '../controllers/middlewares/signinMiddleware';
import CreateGroupValidations from '../controllers/middlewares/createGroupMiddleware';
import AddUserValidations from '../controllers/middlewares/addUserMiddleware';
import checkUserInGroup from '../controllers/middlewares/checkUserInGroup';
import SendMessageValidations from '../controllers/middlewares/sendMessageMiddleware';

const router = express.Router();

router.get('/api/user', UserController.getAllUsers);
router.post('/api/user/signup', SignupValidations.validateUserInput, UserController.signup);
router.post('/api/user/signin', SigninValidations.validateUserInput, UserController.signin);
router.post('/api/group', CreateGroupValidations.validateUserInput, GroupController.createGroup);
router.get('/api/group', GroupController.getGroup);
router.post('/api/group/:groupId/message', SendMessageValidations.validateUserInput, MessageController.sendMessage);
router.get('/api/group/:groupId/messages', MessageController.getMessages);
router.post('/api/group/:groupId/user', AddUserValidations.validateUserInput, checkUserInGroup.isGroupMember, GroupController.addUserToGroup);

export default router;
