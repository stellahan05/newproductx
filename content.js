// Check if mascot already exists to prevent duplicates
if (!document.getElementById('studyBuddyMascot')) {
    const mascot = document.createElement('img');
    mascot.id = 'studyBuddyMascot';
    mascot.src = chrome.runtime.getURL('mascot.png'); // Load from extension
    mascot.style.position = 'fixed';
    mascot.style.bottom = '10px';
    mascot.style.right = '10px';
    mascot.style.width = '100px';
    mascot.style.height = '100px';
    mascot.style.zIndex = '10000';
    mascot.style.cursor = 'grab';

    document.body.appendChild(mascot);

    // Allow dragging
    let offsetX, offsetY, isDragging = false;

    mascot.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - mascot.getBoundingClientRect().left;
        offsetY = e.clientY - mascot.getBoundingClientRect().top;
        mascot.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            mascot.style.left = `${e.clientX - offsetX}px`;
            mascot.style.top = `${e.clientY - offsetY}px`;
            mascot.style.position = 'absolute';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        mascot.style.cursor = 'grab';
    });

    // Store mascot visibility state
    chrome.storage.sync.get(['mascotVisible'], (data) => {
        if (data.mascotVisible === false) {
            mascot.style.display = 'none';
        }
    });

    // Listen for toggle requests
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === 'toggleMascot') {
            mascot.style.display = mascot.style.display === 'none' ? 'block' : 'none';
            chrome.storage.sync.set({ mascotVisible: mascot.style.display !== 'none' });
        }
    });
}
