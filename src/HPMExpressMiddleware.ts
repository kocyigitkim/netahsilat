import * as express from 'express';
import { Delivery } from './Delivery';
import { HPMHelper } from './HPMHelper';
import { HttpPostRequestMessage } from './HttpPostRequestMessage';
import { HttpPostResponseMessage } from './HttpPostResponseMessage';
import { Order } from './Order';
import { Payment } from './Payment';
import { PaymentFailedResponseForm, PaymentSuccessResponseForm } from './ResponseForms';
import { SerializationType } from './SerializationType';
import { User } from './User';

export interface HPMPaymentRequestSuccessAction {
    public(response: HttpPostResponseMessage, req: express.Request): { title: string, message: string };
}

export interface HPMPaymentRequestFailedAction {
    public(response: HttpPostResponseMessage, req: express.Request): { title: string, message: string };
}

export class HPMExpressMiddleware {
    private app: express.Application;
    public path: string;
    public hpmUrl: string;
    public baseUrl: string;
    public key: string;
    constructor(app: express.Application, hpmUrl: string, key: string, baseUrl: string = "", path: string = "/order/payment") {
        this.app = app;
        this.path = path;
        this.hpmUrl = hpmUrl;
        this.baseUrl = baseUrl;
        this.key = key;
    }
    public usePaymentProcess(action: (request: HttpPostRequestMessage, req: express.Request, res: express.Response) => Promise<Boolean> | Boolean) {
        this.app.use(`${this.path}/process`, async (req, res, next) => {
            var request = new HttpPostRequestMessage();
            request.User = new User();
            request.Order = new Order();
            request.Payment = new Payment();
            request.Payment.SuccessUrl = `${this.baseUrl}${this.path}/success`;
            request.Payment.FailUrl = `${this.baseUrl}${this.path}/failed`;

            request.Delivery = new Delivery();
            var r = action(request, req, res);
            if (r instanceof Promise) r = await (r as any).catch(console.error);
            if (r === false) {
                return;
            }
            res.header("Content-Type", "text/html");
            res.status(200);
            res.send(HPMHelper.BuildForm(this.hpmUrl, this.key, request, SerializationType.JSON));
        });
    }
    public usePaymentSuccess(action: (response: HttpPostResponseMessage, req: express.Request) => { title: string, message: string }) {
        this.app.use(`${this.path}/success`, async (req, res, next) => {
            var response = HPMHelper.ReceivePaymentRequest(req.body, SerializationType.JSON);
            var r = action(response, req);

            if (response && response.Request.Error && response.Request.Error.Code === 'PaymentCancelled') {
                res.header("Content-Type", "text/html");
                res.status(200);
                res.send(PaymentFailedResponseForm(r.title, r.message));
                return;
            }

            if (r instanceof Promise) r = await r.catch(console.error);
            res.header("Content-Type", "text/html");
            res.status(200);
            res.send(PaymentSuccessResponseForm(r.title, r.message));
        });
    }
    public usePaymentFailed(action: (response: HttpPostResponseMessage, req: express.Request) => { title: string, message: string }) {
        this.app.use(`${this.path}/failed`, async (req, res, next) => {
            var response = HPMHelper.ReceivePaymentRequest(req.body, SerializationType.JSON);
            var r = action(response, req);
            if (r instanceof Promise) r = await r.catch(console.error);
            res.header("Content-Type", "text/html");
            res.status(200);
            res.send(PaymentFailedResponseForm(r.title, r.message));
        });
    }
}