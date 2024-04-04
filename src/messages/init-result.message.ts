import {MessageTypeEnum} from "../enums/message-type.enum";

export class InitResultMessage {
    type: MessageTypeEnum = MessageTypeEnum.Init;

    constructor(public readonly uniqueId: string,
                public readonly error: string,) {
    }
}