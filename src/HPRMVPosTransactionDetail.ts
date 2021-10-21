import { HttpPostTansactionError } from "./HttpPostTansactionError";

export class HPRMVPosTransactionDetail {
    Id: number;
    Status: number;
    Type: number;
    DateTime: string;
    Error: HttpPostTansactionError;
    Amount: string;
    NetAmount: string;
    ProvisionNumber: string;
}
