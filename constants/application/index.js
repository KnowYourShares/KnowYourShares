module.exports = {
    SERVER_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    SERVER_IP: process.env.OPENSHIFT_NODEJS_IP ||'localhost',
    SECRET: 'someSecret',
    CODE: {
        200: {status: 200, message: 'OK'},
        404: {status: 404, message: 'Page not found'},
        500: {status: 500, message: 'server internal error'}
    },
    TOKEN_EXPIRES: 3153600000000, // 10 years
    MONGO_IP: 'mongodb://localhost:27017/'
};