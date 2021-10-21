import { SerializationType } from "./SerializationType";
import xml from 'xml';
import xml2js from 'xml-js';


export class SerializationHelper {
    public static Serialize(requestMessage: any, serializationType: SerializationType = SerializationType.JSON): string {
        if (serializationType == SerializationType.JSON)
            return JSON.stringify(requestMessage);
        else if (serializationType == SerializationType.XML) {
            return xml(requestMessage);
        }
        else {
            return requestMessage.toString();
        }
    }
    public static Deserialize(response: string, serializationType: SerializationType = SerializationType.JSON): any {
        if (serializationType == SerializationType.JSON)
            return JSON.parse(response);
        else if (serializationType == SerializationType.XML) {
            return xml2js.xml2js(response, { compact: true });
        }
        else {
            return response as any;
        }
    }
}
