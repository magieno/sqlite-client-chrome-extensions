import {MessageInterface} from './interfaces/message.interface';
import {MessageTypeEnum} from './enums/message-type.enum';
import {ListAllFilesMessage} from './messages/list-all-files.message';
import {ListAllFilesMessageProcessor} from "./message-processors/list-all-files.message-processor";


((chrome) => {
  const responses: {[id in string]: {
    sendResponse: (message: MessageInterface) => void;
  }} = {}

  const asyncFunctionWithAwait = async (message: MessageInterface, sender, sendResponse) => {
    // Parse the message
    switch (message.type) {
      case MessageTypeEnum.ListAllFiles: {
        const messageProcessor = new ListAllFilesMessageProcessor();
        const response = await messageProcessor.process(message as ListAllFilesMessage);
        sendResponse(response);
      }

      case MessageTypeEnum.ExecuteSqlQuery: {
        window.dispatchEvent(new CustomEvent("MAGIENO_SQLITE_CLIENT_FROM_EXTENSION", {detail: message}));
        responses[message.uniqueId] = {sendResponse};
      }

      case MessageTypeEnum.ExecuteSqlQueryResult: {
        console.log(message);
      }
    }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // https://stackoverflow.com/a/65405319/6255000
    asyncFunctionWithAwait(message, sender, sendResponse);

    return true;
  });

  window.addEventListener("MAGIENO_SQLITE_CLIENT_TO_EXTENSION", (event) => {
    if(event.detail.type === "EXECUTE_SQL_QUERY_RESULT") {
      const response = event.detail;
      responses[response.uniqueId].sendResponse(response);

      delete responses[response.uniqueId];
    }
  });

  // @ts-ignore
})(chrome || browser);