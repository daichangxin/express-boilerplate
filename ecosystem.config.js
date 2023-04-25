module.exports = {
    apps: [
        {
            name: 'express-boilerplate-service',
            script: './dist/src/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
