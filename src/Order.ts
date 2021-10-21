import { Item } from "./Item";
import { OrderExtraData } from "./OrderExtraData";

export class Order {
    Reference: string;
    DateTime: string;
    ShippingMethod: string;
    Amount: number;
    ShippingCost: number;
    CustomReference: string;
    Items: Item[];
    ExtraData: OrderExtraData[];
}