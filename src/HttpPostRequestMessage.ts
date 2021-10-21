import { NTUser } from "./NTUser";
import { Order } from "./Order";
import { Payment } from "./Payment";
import { User } from "./User";
import { Delivery } from './Delivery';
import { EmailOrderType } from "./EmailOrderType";

export class HttpPostRequestMessage {
    HttpPostRequestId: number;
    Datetime: Date | string;
    HttpPostPaymentStatusId: number;
    HttpPostResponseStatusId: number;
    Payment: Payment;
    Order: Order;
    NTUser: NTUser;
    User: User;
    Delivery: Delivery;
    Response: Response;
    RegisteredUser: number;
    HashMethod: number;
    Hash: string;
    EmailOrderTypeId: EmailOrderType;
}