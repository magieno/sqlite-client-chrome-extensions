import {MessageTypeEnum} from "../enums/message-type.enum";

export class ListAllFilesResultMessage {
    type: MessageTypeEnum = MessageTypeEnum.ListAllFilesResult;

    constructor(public readonly uniqueId: string,
                public readonly sqliteFiles: string[][],
                public readonly files: string[][]) {
    }
}