import { HPRMOrder } from "./HPRMOrder";
import { HPRMRequest } from "./HPRMRequest";
import { HPRMResponse } from "./HPRMResponse";
import { HPRMVPosTransaction } from "./HPRMVPosTransaction";
import { NTUser } from "./NTUser";
import { User } from "./User";

export class HttpPostResponseMessage {
    Response: HPRMResponse;
    Order: HPRMOrder;
    Request: HPRMRequest;
    Billing: User;
    NTUser: NTUser;
    Transactions: HPRMVPosTransaction[];
}
