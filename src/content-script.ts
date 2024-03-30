((chrome) => {

  //chrome.runtime.sendMessage({ message: "Message from content_script.js" }, (response) => {});

  const asyncFunctionWithAwait = async (request, sender, sendResponse) => {

    await new Promise<void>((resolve, reject) => {
      return resolve();
    })

    sendResponse("Message from content_script.js")
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // https://stackoverflow.com/a/65405319/6255000
    asyncFunctionWithAwait(request, sender, sendResponse);

    return true;
  });
})(chrome);