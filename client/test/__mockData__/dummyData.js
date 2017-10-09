export const user = [
  {
    id: 1,
    username: 'femz',
    email: 'femz@gmail.com',
    phoneNo: '08012345678',
    password: '123456',
    token: '1212112'
  },
  {
    id: 2,
    username: 'boy1',
    email: 'boy1@gmail.com',
    phoneNumber: '99999999',
    password: '123456',
    passwordConfirmation: '123456',
    token: '1212112'
  },
  {
    id: 3,
    username: 'boy2',
    email: 'boy2@gmail.com',
    phoneNumber: '1234443454',
    password: '123456',
    token: '1212112'
  },
  {}
];

export const group = {
  groupId: 1,
  groupname: 'lagos fellows'
};

export const groups = [
  {
    groupname: 'june fellows',
    id: 1,
  },
  {
    groupname: 'law',
    id: 2,
  }
];

export const metaData = {
  offset: 0,
  perPage: 5
};

export const messages = {
  content: 'hello man',
  createdAt: '2017-08-03T12:33:32.666Z',
  groupId: 1,
  id: 1,
  messagecreator: 'phemmz',
  priority: 1,
  readcheck: null,
  updatedAt: '2017-08-03T12:33:32.666Z',
  userId: 1,
};

export const readList = ['phemmz', 'tuna'];

export const notification = 'new message from ksung group';

export const groupName = 'New Group';

export const initialSignupState = {
  username: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirmation: '',
  errors: {},
  invalid: false
};

export const initialLoginState = {
  username: '',
  password: '',
  errors: {},
  isLoading: false
};

export const initialCreateGroupState = {
  users: {},
  groupname: {},
  list: [],
  userList: []
};

export const initialCheckVerificationState = {
  errors: {},
  invalid: false,
  resetMessage: '',
  verificationCode: '',
  verificationStatus: false,
  password: '',
  passwordConfirmation: ''
};

export const initialAuthState = {
  isAuthenticated: false,
  user: {}
};

export const initialGroupState = {
  groupList: [],
  selectedGroup: null,
  groupMessages: [],
  appStatus: 'ready',
  list: {},
  groupMembers: [],
  groupCreated: []
};

export const initialMessageState = {
  groupList: [],
  groupMessages: [],
  list: {},
  notifications: [],
  readStatus: false,
  readList: [],
  groupName: 'Welcome'
};

export const initialUserState = {
  users: [],
  searchedUsers: [],
  meta: {}
};
