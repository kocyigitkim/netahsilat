import { NTVendor } from "./NTVendor";

export class NTUser {
    Id: number;
    FName: string;
    LName: string;
    Mobile: string;
    Email: string;
    TCKN: string;
    Password: string;
    Code: string;
    Vendor: NTVendor;
    WebSiteId: number;
}