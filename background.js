chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(['blockedWords'], function(result) {
        if (chrome.runtime.lastError || !result.blockedWords) {
            console.log('Initializing blocked words list.');
            chrome.storage.sync.set({'blockedWords': []}); // Initialize with an empty array if not set
        }
    });
});
