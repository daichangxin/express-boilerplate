import httpStatus from 'http-status';
import { APIError } from '../utils/apiError';
import { config } from '../config';
import { logger } from './logger';

export const converToAPIError = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof APIError)) {
        const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new APIError(statusCode, message, false, err.stack);
    }
    next(error);
};

export const handleAPIError = (err, req, res, next) => {
    let { statusCode, message } = err;
    const isProd = config.node_env === 'production';
    const isDev = config.node_env === 'development';
    if (isProd && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    const response = {
        code: statusCode,
        message,
        ...(isDev && { stack: err.stack }),
    };
    if (isDev) {
        logger.error(err);
    }
    res.status(statusCode).send(response);
};
