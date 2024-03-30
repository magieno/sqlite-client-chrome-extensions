import {MessageInterface} from "../interfaces/message.interface";
import {MessageTypeEnum} from "../enums/message-type.enum";

export class ListAllFilesMessage implements MessageInterface {
    type: MessageTypeEnum = MessageTypeEnum.ListAllFiles;
    uniqueId: string = crypto.randomUUID();

    constructor() {
    }
}