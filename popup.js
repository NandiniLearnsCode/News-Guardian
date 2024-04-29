document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addWordButton');
    const wordInput = document.getElementById('wordInput');
    const blockedWordsList = document.getElementById('blockedWordsList');

    // Load blocked words from storage
    chrome.storage.sync.get(['blockedWords'], function(result) {
        const blockedWords = result.blockedWords || [];
        updateBlockedWordsList(blockedWords);
    });

    // Add word button click event
    addButton.addEventListener('click', function() {
        const newWord = wordInput.value.trim();
        if (newWord) {
            chrome.storage.sync.get(['blockedWords'], function(result) {
                let blockedWords = result.blockedWords || [];
                if (!blockedWords.includes(newWord)) {
                    blockedWords.push(newWord);
                    chrome.storage.sync.set({'blockedWords': blockedWords}, function() {
                        updateBlockedWordsList(blockedWords);
                    });
                }
            });
        }
        wordInput.value = ''; // Clear input field
    });

    // Function to update the blocked words list on the popup
    function updateBlockedWordsList(words) {
        blockedWordsList.innerHTML = '';
        words.forEach(function(word) {
            const li = document.createElement('li');
            li.textContent = word;
            const removeButton = document.createElement('span');
            removeButton.innerHTML = '&#x2716;'; // Unicode character for "x"
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', function() {
                chrome.storage.sync.get(['blockedWords'], function(result) {
                    let blockedWords = result.blockedWords || [];
                    const index = blockedWords.indexOf(word);
                    if (index !== -1) {
                        blockedWords.splice(index, 1);
                        chrome.storage.sync.set({'blockedWords': blockedWords}, function() {
                            updateBlockedWordsList(blockedWords);
                        });
                    }
                });
            });
            li.appendChild(removeButton);
            blockedWordsList.appendChild(li);
        });
    }
});



