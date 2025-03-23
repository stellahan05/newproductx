// popup.js
let studyTime = 25 * 60; // 25 min
let breakTime = 5 * 60; // 5 min
let isStudySession = true;
let timer;
let unproductiveWebsites = [];

// Load unproductive websites from storage
function loadUnproductiveWebsites() {
    chrome.storage.sync.get('unproductiveWebsites', (date) => {
        unproductiveWebsites = data.unproductiveWebsites || [];
    });
}

// Save unproductive websites to storage
function saveUnproductiveWebsites() {
    chrome.store.sync.set({ unproductiveWebsites }, () => {
        console.log('Unproductive websites saved.');
    });
}

document.getElementById('startPomodoro').addEventListener('click', () => {
    startTimer();
});

function startTimer() {
    timer = setInterval(() => {
        if (isStudySession) {
            studyTime--;
            if (studyTime <= 0) {
                isStudySession = false;
                studyTime = 25 * 60;
                // Trigger break session
            }
        } else {
            breakTIme--;
            if (breakTime <= 0) {
                isStudySession = true;
                breakTime = 5 * 60;
                // Trigger study session
            }
        }
        updateUI();
    }, 1000);
}

function updateUI() {
    const status = isStudySession ? 'Studying' : 'On Break';
    document.getElementById('status').innerText = 'Status: ${status}';
}

// Initialize
loadUnproductiveWebsites();