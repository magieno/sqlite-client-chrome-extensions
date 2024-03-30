import Port = chrome.runtime.Port;

((chrome) => {
    chrome.runtime.onConnect.addListener((devToolsConnection: Port) => {
        // Assign the listener function to a variable so we can remove it later.
        const devToolsListener = ({ tabId, name }, port) => {
            console.log("Service Worker connected")
            name === 'init' && port.postMessage(`Connected: ${tabId}`);
        };

        devToolsConnection.onMessage.addListener(devToolsListener);
        devToolsConnection.onDisconnect.addListener(() => {
            devToolsConnection.onMessage.removeListener(devToolsListener);
        });

        chrome.tabs.onUpdated.addListener(() => {
            devToolsConnection.postMessage({ name: 'navigation' });
        });
    });
})(chrome);