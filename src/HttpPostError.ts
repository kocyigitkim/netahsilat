import { ErrorExtraData } from "./ErrorExtraData";

export class HttpPostError {
    Code: string;
    Message: string;
    ExtraData: ErrorExtraData[];
}
