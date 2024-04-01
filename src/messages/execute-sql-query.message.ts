import {MessageInterface} from "../interfaces/message.interface";
import {MessageTypeEnum} from "../enums/message-type.enum";

export class ExecuteSqlQueryMessage implements MessageInterface {
    type: MessageTypeEnum = MessageTypeEnum.ExecuteSqlQuery;
    uniqueId: string = crypto.randomUUID();

    constructor(public readonly filename: string, public readonly query: string) {
    }
}