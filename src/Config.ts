import { SerializationType } from "./SerializationType";
import { HashType } from "./HashType";

export class Config {
    public Key: string;
    public PaymentUrl: string;
    public ResponseAckUrl: string;
    public SerializationType: SerializationType;
    public HashType: HashType;

}
