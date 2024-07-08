// script.js

function centerElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
    }

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;
    const placementHeight = (viewportHeight / 2) - (elementHeight / 2);
    const placementWidth = (viewportWidth / 2) - (elementWidth / 2);

    if (viewportHeight <= 850) {
        element.style.position = 'absolute';
        element.style.top = `${placementHeight}px`;
        element.style.left = `${placementWidth}px`;
    } else {
        element.style.position = '';
        element.style.top = '';
        element.style.left = '';
    }
}

function bottomElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
    }

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;
    const placementHeight = (viewportHeight) - elementHeight * 1.65;
    const placementWidth = (viewportWidth / 2) - (elementWidth / 2);

    if (viewportHeight <= 850) {
        element.style.position = 'absolute';
        element.style.display = 'flex';
        element.style.top = `${placementHeight}px`;
        element.style.left = `${placementWidth}px`;
    } else {
        element.style.display = 'flex';
        element.style.position = 'relative';
        element.style.top = '';
        element.style.left = '';
    }
}

function stickyElement(elementId, mode) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
    }

    if (mode === 'center') {
        centerElement(elementId);
        window.addEventListener('resize', () => centerElement(elementId));
    } else if (mode === 'bottom') {
        bottomElement(elementId);
        window.addEventListener('resize', () => bottomElement(elementId));
    } else {
        console.error(`Unsupported mode: ${mode}`);
    }
}

stickyElement('mainTitle', 'center');
stickyElement('byLine', 'bottom');
  
  // Smooth scroll to top function
  function moveTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
