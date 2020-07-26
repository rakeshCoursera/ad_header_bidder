const config = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'dev',
    apiUrl: process.env.API_URL || 'https://hn.algolia.com/api/v1/search_by_date',
};

export default config;