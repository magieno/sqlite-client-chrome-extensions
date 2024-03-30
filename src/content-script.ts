((chrome) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // https://stackoverflow.com/a/65405319/6255000
    //asyncFunctionWithAwait(request, sender, sendResponse);
    console.log(request);

    sendResponse("Message from content_script.js")
    return true;
  });
})(chrome);