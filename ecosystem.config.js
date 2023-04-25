
module.exports = {
    apps: [
        {
            name: 'express-boilerplate-service',
            script: 'yarn',
            args: 'start',
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
