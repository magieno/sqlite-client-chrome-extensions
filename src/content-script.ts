import {MessageInterface} from './interfaces/message.interface';
import {MessageTypeEnum} from './enums/message-type.enum';
import {ListAllFilesMessageProcessor} from './message-processors/list-all-files.message-processor';
import {ListAllFilesMessage} from './messages/list-all-files.message';


((chrome) => {

  const asyncFunctionWithAwait = async (message: MessageInterface, sender, sendResponse) => {
    // Parse the message
    switch (message.type) {
      case MessageTypeEnum.ListAllFiles:
        const messageProcessor = new ListAllFilesMessageProcessor();
        const response = await messageProcessor.process(message as ListAllFilesMessage);
        sendResponse(response);
    }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // https://stackoverflow.com/a/65405319/6255000
    asyncFunctionWithAwait(message, sender, sendResponse);

    return true;
  });
})(chrome);