import * as express from 'express';
import { HttpPostRequestMessage } from './HttpPostRequestMessage';
import { HttpPostResponseMessage } from './HttpPostResponseMessage';
export interface HPMPaymentRequestSuccessAction {
    public(response: HttpPostResponseMessage, req: express.Request): {
        title: string;
        message: string;
    };
}
export interface HPMPaymentRequestFailedAction {
    public(response: HttpPostResponseMessage, req: express.Request): {
        title: string;
        message: string;
    };
}
export declare class HPMExpressMiddleware {
    private app;
    path: string;
    hpmUrl: string;
    baseUrl: string;
    key: string;
    constructor(app: express.Application, hpmUrl: string, key: string, baseUrl?: string, path?: string);
    usePaymentProcess(action: (request: HttpPostRequestMessage, req: express.Request, res: express.Response) => Promise<Boolean> | Boolean): void;
    usePaymentSuccess(action: (response: HttpPostResponseMessage, req: express.Request) => {
        title: string;
        message: string;
    }): void;
    usePaymentFailed(action: (response: HttpPostResponseMessage, req: express.Request) => {
        title: string;
        message: string;
    }): void;
}
//# sourceMappingURL=HPMExpressMiddleware.d.ts.map