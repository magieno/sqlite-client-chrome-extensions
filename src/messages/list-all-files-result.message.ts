import {MessageTypeEnum} from "../enums/message-type.enum";

export class ListAllFilesResultMessage {
    type: MessageTypeEnum = MessageTypeEnum.ListAllFilesResult;

    constructor(public readonly uniqueId: string) {
    }
}