import { config } from '../config';
import { createLogger, format, transports } from 'winston';
import packageJson from '../../package.json';
import DailyRotateFile from 'winston-daily-rotate-file';

const infoTrasport = new DailyRotateFile({
    filename: 'logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const errorTransport = new DailyRotateFile({
    level: 'error',
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

export const logger = createLogger({
    level: config.node_env === 'production' ? 'info' : 'debug',
    format: format.json(),
    defaultMeta: { service: packageJson.name },
    transports: [infoTrasport, errorTransport],
    exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
});

if (config.node_env !== 'production') {
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}
