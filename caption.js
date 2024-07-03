let captionCount = 0;

function addCaption(element) {
    captionCount++;
    const caption = document.createElement('div');
    caption.className = `caption ${getRandomCorner()}`;
    caption.textContent = captionCount;
    element.style.position = 'relative';
    element.appendChild(caption);
}

function getRandomCorner() {
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    return corners[Math.floor(Math.random() * corners.length)];
}

document.querySelectorAll('.captionable').forEach(addCaption);