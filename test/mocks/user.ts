const validUser: newUser = {
  email: 'aviv@gmail.com',
  username: 'aviv',
  password: '123456',
  bio: 'I love hamburgers <3',
  birthDate: new Date('03 / 19 / 1999'),
};
interface user {
  email: string;
  username: String;
  password: String;
  isAdmin: Boolean;
  isConnected: Boolean;
  bio: String;
  birthDate: Date;
}
interface newUser {
  email: string;
  username: String;
  password: String;
  bio: String;
  birthDate: Date;
}
module.exports = { validUser };
