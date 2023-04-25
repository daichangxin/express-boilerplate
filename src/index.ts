import { app } from './app';
import { config } from './config';
import { logger } from './middleware/logger';

const server = app.listen(parseInt(config.port), () => {
    logger.log('info', `Server is running on Port: ${config.port}, env:${config.node_env}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    logger.info('Closing server');
    if (server) {
        server.close((err) => {
            logger.info('Server closed');
            process.exit(err ? 1 : 0);
        });
    }
});
