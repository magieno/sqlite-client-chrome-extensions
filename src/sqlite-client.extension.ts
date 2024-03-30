import {InitServiceWorkerMessage} from "./messages/init-service-worker.message";
import {ListAllFilesMessage} from "./messages/list-all-files.message";

((browser) => {
    document.getElementById("refresh-databases").addEventListener("click", async () => {
        console.log("Refresh databases clicked.")

        chrome.tabs.sendMessage(browser.devtools.inspectedWindow.tabId, new ListAllFilesMessage(), (response) => {
            console.log("In SqliteClientExtension, received response from content script: ", response)});
    });

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("SQliteClient", request);
    })

})(chrome);