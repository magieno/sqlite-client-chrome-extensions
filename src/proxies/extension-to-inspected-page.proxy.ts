import {MessageInterface} from '../interfaces/message.interface';
import {ListAllFilesMessage} from '../messages/list-all-files.message';
import {MessageTypeEnum} from '../enums/message-type.enum';
import {ListAllFilesResultMessage} from '../messages/list-all-files-result.message';

export class ExtensionToInspectedPageProxy {
  constructor(public readonly tabId: number) {
  }

  async getAllFiles(): Promise<string[][]> {
    const response: ListAllFilesResultMessage = await this.send(new ListAllFilesMessage()) as ListAllFilesResultMessage;

    if(response.type !== MessageTypeEnum.ListAllFilesResult) {
      throw new Error("Invalid response type");
    }

    return response.files;
  }

  send(message: MessageInterface): Promise<MessageInterface> {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(this.tabId, message, (response: MessageInterface) => {
        return resolve(response);
      });
    })
  }
}