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

let paths = document.querySelectorAll('path');
paths.forEach((path) => {
    let pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;
});

window.addEventListener('scroll', function() {
    let scrollPosition = document.documentElement.scrollTop + document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = (scrollPosition-1100) / 800;

    // Define the range of scroll position for the script to be active
    let minScrollPosition = 1099; // 20% of the page height
    let maxScrollPosition = 1506; // 80% of the page height
    let reverseScrollPosition = 2000; // Position to start reverse drawing

    if (scrollPosition >= minScrollPosition && scrollPosition <= maxScrollPosition) {
        paths.forEach((path) => {
            let pathLength = path.getTotalLength();
            let drawLength = pathLength * scrollPercentage;
            path.style.strokeDashoffset = pathLength - drawLength;
        });
    } else if (scrollPosition > maxScrollPosition && scrollPosition < reverseScrollPosition) {
        paths.forEach((path) => {
            let pathLength = path.getTotalLength();
            path.style.strokeDashoffset = 0;
        });
    }  else if (scrollPosition >= reverseScrollPosition) {
        let reverseScrollPercentage = (scrollPosition - reverseScrollPosition) / 800;
        paths.forEach((path) => {
            let pathLength = path.getTotalLength();
            let drawLength = pathLength * reverseScrollPercentage;
            if (drawLength < pathLength) {
                path.style.strokeDashoffset = drawLength;
            } else {
                path.style.strokeDashoffset = pathLength;
            }
        });
    }
});

window.addEventListener('load', function() {
    let viewportHeight = window.innerHeight;
    let svgImage = document.querySelector('#turkey-provinces-map'); // replace '#currentSvg' with your SVG image selector
    let svgImageWidth = svgImage.getBoundingClientRect().width;
    let constraintRatio = svgImageWidth / 600;
    let svgImageHeight = svgImage.getBoundingClientRect().height;
    let stickyElement = document.querySelector('.sticky-map-one'); // replace '.sticky-map-one' with your sticky element selector

    let topValue = (viewportHeight / 2) - ((svgImageHeight*constraintRatio) / 6);
    stickyElement.style.top = topValue + 'px';
});

let backArrow = document.getElementsById("backArrow");
window.onscroll = function() { scrollFunction(); };

function scrollFunction() {
    // Calculate 150% of the viewport height
    let scrollHeight = window.innerHeight * 1.5;
    
    // Check if the page is scrolled beyond 150% of viewport height
    if (document.body.scrollTop > scrollHeight || document.documentElement.scrollTop > scrollHeight) {
      backArrow.style.display = "block";
    } else {
      backArrow.style.display = "none";
    }
  }
  
  // Smooth scroll to top function
  function moveTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
backArrow.addEventListener("click", moveTop);

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.chapter');
    const navLinks = document.querySelectorAll('.nav-link');

    function changeActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});