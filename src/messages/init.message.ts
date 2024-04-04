import {MessageTypeEnum} from "../enums/message-type.enum";

export class InitMessage {
    type: MessageTypeEnum = MessageTypeEnum.Init;
    uniqueId: string = crypto.randomUUID();
}