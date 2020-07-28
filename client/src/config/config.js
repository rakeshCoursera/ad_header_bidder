const config = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'dev',
    newsApiUrl: process.env.NEWS_API_URL || '',
    adsApiUrl: process.env.ADS_API_URL || '',
    authUser: process.env.AUTH_USER || '',
    authPwd: process.env.AUTH_PWD || '', 
};

export default config;