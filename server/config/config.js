const config = {
  port: process.env.PORT || 3000,
  mongoUser: process.env.MONGO_USER || '',
  mongoPass: process.env.MONGO_PASS || '',
  authUser: process.env.AUTH_USER || '',
  authPwd: process.env.AUTH_PWD || '',
};

module.exports = config;
