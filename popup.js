// popup.js
let studyTime = 25 * 60; // 25 min
let breakTime = 5 * 60; // 5 min
let isStudySession = true;
let timer;
let unproductiveWebsites = [];

// Load unproductive websites from storage
function loadUnproductiveWebsites() {
    chrome.storage.sync.get('unproductiveWebsites', (data) => {
        unproductiveWebsites = data.unproductiveWebsites || [];
        displayWebsites();
    });
}

// Save unproductive websites to storage
function saveUnproductiveWebsites() {
    chrome.storage.sync.set({ unproductiveWebsites }, () => {
        console.log('Unproductive websites saved.');
    });
}

document.getElementById('startPomodoro').addEventListener('click', () => {
    const button = document.getElementById('startPomodoro');
    if (button.innerText === 'Start Pomodoro') {
        startTimer();
        document.getElementById('mascot').style.display = 'block';
        button.innerText = 'Close Pomodoro';
    } else {
        clearInterval(timer);
        document.getElementById('mascot').style.display = 'none';
        button.innerText = 'Start Pomodoro';
        document.getElementById('status').innerText = 'Status: Waiting...';
        document.getElementById('timer').innerText = 'Time: 25:00';
        studyTime = 25 * 60;
        breakTime = 5 * 60;
        isStudySession = true;
    }
});

document.getElementById('addWebsite').addEventListener('click', () => {
    const websiteInput = document.getElementById('websiteInput');
    const website = websiteInput.value.trim();
    if (website && !unproductiveWebsites.includes(website)) {
        unproductiveWebsites.push(website);
        saveUnproductiveWebsites();
        displayWebsites();
        websiteInput.value = '';
    }
});

function displayWebsites() {
    const websiteList = document.getElementById('websiteList');
    websiteList.innerHTML = '';
    unproductiveWebsites.forEach(site => {
        const li = document.createElement('li');
        li.textContent = site;
        websiteList.appendChild(li);
    });
}

function startTimer() {
    timer = setInterval(() => {
        if (isStudySession) {
            studyTime--;
            if (studyTime <= 0) {
                isStudySession = false;
                studyTime = 25 * 60;
                chrome.storage.sync.set({ isStudySession });
                // Trigger break session
            }
        } else {
            breakTime--;
            if (breakTime <= 0) {
                isStudySession = true;
                breakTime = 5 * 60;
                chrome.storage.sync.set( {isStudySession });
                // Trigger study session
            }
        }
        updateUI();
    }, 1000);
}

function updateUI() {
    const status = isStudySession ? 'Studying' : 'On Break';
    document.getElementById('status').innerText = `Status: ${status}`;

    const time = isStudySession ? studyTime : breakTime;
    const minutes = Math.floor(time /60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Initialize
loadUnproductiveWebsites();