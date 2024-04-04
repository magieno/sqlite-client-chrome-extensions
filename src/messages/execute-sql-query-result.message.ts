import {MessageInterface} from "../interfaces/message.interface";
import {MessageTypeEnum} from "../enums/message-type.enum";

export class ExecuteSqlQueryResultMessage implements MessageInterface {
    type: MessageTypeEnum = MessageTypeEnum.ExecuteSqlQuery;

    constructor(public readonly uniqueId: string, public readonly filename: string, public readonly response?: any, public readonly error?: string) {
    }
}