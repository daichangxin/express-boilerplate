import compression from 'compression';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import xss from 'xss-clean';
import { converToAPIError, handleAPIError } from './middleware/error';
import { requestIdMiddleware } from './middleware/requestIdMiddleware';
import { APIError } from './utils/apiError';
import compressFilter from './utils/compressFilter.util';

export const app: Express = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression({ filter: compressFilter }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use(requestIdMiddleware);

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new APIError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(converToAPIError);

// handle error
app.use(handleAPIError);
