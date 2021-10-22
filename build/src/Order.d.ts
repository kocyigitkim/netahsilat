import { Item } from "./Item";
import { OrderExtraData } from "./OrderExtraData";
export declare class Order {
    Reference: string;
    DateTime: string;
    ShippingMethod: string;
    Amount: number;
    ShippingCost: number;
    CustomReference: string;
    Items: Item[];
    ExtraData: OrderExtraData[];
}
//# sourceMappingURL=Order.d.ts.map