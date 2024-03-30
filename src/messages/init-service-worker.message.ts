import {MessageInterface} from "../interfaces/message.interface";
import {MessageTypeEnum} from "../enums/message-type.enum";

export class InitServiceWorkerMessage implements MessageInterface {
    type: MessageTypeEnum = MessageTypeEnum.InitServiceWorker;
    uniqueId: string = crypto.randomUUID();

    constructor() {
    }
}