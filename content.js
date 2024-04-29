chrome.storage.sync.get(['blockedWords'], function(result) {
    if (result.blockedWords && result.blockedWords.length > 0) {
        const blockedWords = result.blockedWords;
        const bodyText = document.body.innerText.toLowerCase();

        for (let word of blockedWords) {
            if (bodyText.includes(word.toLowerCase())) {
                const overlay = document.createElement('div');
                overlay.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1000; display: flex; justify-content: center; align-items: center; color: white; font-size: 20px;');
                overlay.innerHTML = '<div style="padding: 20px; background: #ffcccb; border-radius: 10px;">This page contains blocked content.</div>';
                document.body.appendChild(overlay);
                break; // Stop checking after the first match
            }
        }
    }
});
