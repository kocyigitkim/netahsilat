import { CustomData } from "./CustomData";
import { UserVerify } from "./UserVerify";
import { UserVerifyFailAction } from "./UserVerifyFailAction";
export declare class User {
    ParentCode: string;
    Id: number;
    FName: string;
    LName: string;
    Mobile: string;
    Email: string;
    TCKN: string;
    Password: string;
    Company: string;
    TaxNum: string;
    TaxOff: string;
    Code: string;
    ErpCode: string;
    Phone: string;
    Fax: string;
    Address: string;
    Zip: string;
    City: string;
    District: string;
    Neighborhood: string;
    Verify: UserVerify;
    VerifyFailAct: UserVerifyFailAction;
    ShowFullNameOnPaymentPage: number;
    CData: CustomData[];
}
//# sourceMappingURL=User.d.ts.map