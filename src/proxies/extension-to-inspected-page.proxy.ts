import {MessageInterface} from '../interfaces/message.interface';
import {ListAllFilesMessage} from '../messages/list-all-files.message';
import {MessageTypeEnum} from '../enums/message-type.enum';
import {ListAllFilesResultMessage} from '../messages/list-all-files-result.message';
import {ExecuteSqlQueryMessage} from "../messages/execute-sql-query.message";
import {ExecuteSqlQueryResultMessage} from "../messages/execute-sql-query-result.message";
import {InitMessage} from "../messages/init.message";

export class ExtensionToInspectedPageProxy {
  constructor(public readonly tabId: number) {
  }

  async getAllFiles(): Promise<ListAllFilesResultMessage> {
    const response: ListAllFilesResultMessage = await this.send(new ListAllFilesMessage()) as ListAllFilesResultMessage;

    if(response.type !== MessageTypeEnum.ListAllFilesResult) {
      throw new Error("Invalid response type");
    }

    return response;
  }
  async executeSqlQuery(filename: string, query: string): Promise<ExecuteSqlQueryResultMessage> {
    const response: ExecuteSqlQueryResultMessage = await this.send(new ExecuteSqlQueryMessage(filename, query)) as ExecuteSqlQueryResultMessage;

    return response;
  }

  async init() {
    return this.send(new InitMessage());
  }

  send(message: MessageInterface): Promise<MessageInterface> {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.sendMessage(this.tabId, message, (response: MessageInterface) => {
          return resolve(response);
        });
      } catch (e) {
        return reject(e);
      }
    })
  }
}