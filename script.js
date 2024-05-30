// script.js

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

let backArrow = document.getElementsById("back-arrow");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
    backArrow.style.display = "block";
  } else {
    backArrow.style.display = "none";
  }
}
function moveTop() {
    window.scrollTo({ top: 0, behavior: 'smooth', easing: 'ease-in' });
}