import {MessageTypeEnum} from "../enums/message-type.enum";

export interface MessageInterface {
    type: MessageTypeEnum;

    uniqueId: string;
}