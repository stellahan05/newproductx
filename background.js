// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && isStudySession) {
        const url = new URL(tab.url);
        if (unproductiveWebsites.includes(url.hostname)) {
            // Change mascot behavior to scold the user
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: scoldUser
            });
        }
    }
});

function scoldUser() {
    alert('Stay focused! This site is unproductive.');
    // Add more mascot behavior changes here
}