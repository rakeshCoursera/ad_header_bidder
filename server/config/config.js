const config = {
  port: process.env.PORT || 3000,
  mongoUser: process.env.MONGO_USER || 'rksharma1991',
  mongoPass: process.env.MONGO_PASS || 'VkxjuprF8YJ1xhXi',
  authUser: process.env.AUTH_USER || 'admin',
  authPwd: process.env.AUTH_PWD || 'admin@123',
};

module.exports = config;
