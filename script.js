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
    let maxScrollPosition = 1906; // 80% of the page height

    if (scrollPosition >= minScrollPosition && scrollPosition <= maxScrollPosition) {
        paths.forEach((path) => {
            let pathLength = path.getTotalLength();
            let drawLength = pathLength * scrollPercentage;
            path.style.strokeDashoffset = pathLength - drawLength;
        });
    } else if (scrollPosition > maxScrollPosition) {
        paths.forEach((path) => {
            let pathLength = path.getTotalLength();
            path.style.strokeDashoffset = 0;
        });
    }
});

window.addEventListener('scroll', () => {
    const stickyElement = document.querySelector('.sticky-map-one');
    const rect = stickyElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top < viewportHeight / 2) {
        stickyElement.style.top = `${(viewportHeight / 2)-150}px`;
    } else {
        stickyElement.style.top = `50%`;
    }
});