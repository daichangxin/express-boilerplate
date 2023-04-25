import { createNamespace } from 'cls-hooked';
import { v4 } from 'uuid';

export const ns = createNamespace('myApp');
export const requestIdMiddleware = (req, res, next) => {
    ns.run(() => {
        ns.set('requestId', v4());
        next();
    });
};
