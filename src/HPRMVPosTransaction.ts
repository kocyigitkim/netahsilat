import { HPRMField } from "./HPRMField";
import { HPRMPaymentItem } from "./HPRMPaymentItem";
import { HPRMVPosTransactionDetail } from "./HPRMVPosTransactionDetail";

export class HPRMVPosTransaction {
    Id: number;
    Reference: string;
    VPosId: number;
    VPosApiId: number;
    PaySetId: number;
    PaySetName: string;
    Installment: number;
    PlusInstallment: number;
    PaymentDeferral: number;
    CommTypeId: number;
    CommRate: string;
    IsTest: boolean;
    CardBrand: number;
    Name: string;
    Tckn: string;
    Email: string;
    Phone: string;
    CCNumber: string;
    Desc: string;
    Detail: HPRMVPosTransactionDetail[];
    Items: HPRMPaymentItem[];
    CustomData: HPRMField[];
}
