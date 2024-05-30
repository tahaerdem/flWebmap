
mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYWVyZGVtb3p0dXJrIiwiYSI6ImNqZmZ1Nm9zNzM4N3gycW1tMGVreHJ0enQifQ.m_BVyHJ6Ukop8vUSasQv2w';
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
let zoom;

// Function to calculate zoom based on viewport width
function calculateZoom(viewportWidth) {
    if (viewportWidth > 1179) {
        return Math.log2(1100 / 400); // Calculate zoom for 1100px width
    } else  if (viewportWidth < 1179 && viewportWidth > 765) {
        return Math.log2(1100 / 400); // Calculate zoom for 1100px width
    } else {
        return Math.log2(viewportWidth / 200);
    }
}

// Set the initial zoom level
zoom = calculateZoom(viewportWidth);

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    zoom: zoom,
    center: [38.9637, 35.2433],
    scrollZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    touchZoomRotate: false,
    touchPitchHandler: false,
    attributionControl: false,
});

// Update zoom level on window resize
window.addEventListener('resize', function() {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    zoom = calculateZoom(viewportWidth);
    map.setZoom(zoom);
});

// Update zoom level on window scroll
window.addEventListener('scroll', function() {
    let scrollPosition = document.documentElement.scrollTop + document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = scrollPosition / scrollHeight;

    const currentCenter = map.getCenter();
    const currentLng = currentCenter.lng;
    const currentLat = currentCenter.lat;

    const newLng = currentLng + scrollPercentage * 12;
    const newLat = currentLat + scrollPercentage * 15;

    const negLng = currentLng - scrollPercentage * 15;
    const negLat = currentLat - scrollPercentage * 12;

    let minScrollPosition = 0;
    let maxScrollPosition = 0.5;
    let reverseScrollPosition = 0.5;

    if (scrollPercentage >= minScrollPosition && scrollPercentage <= maxScrollPosition) {
        let zoomRange = 10;
        let zoom = calculateZoom(viewportWidth) + (zoomRange * (scrollPercentage - minScrollPosition));
        map.setZoom(zoom);
        map.setCenter([newLng, newLat]);
    } else if (scrollPercentage > maxScrollPosition && scrollPercentage < reverseScrollPosition) {
        let zoomRange = 10;
        let zoom = calculateZoom(viewportWidth) - (zoomRange * (scrollPercentage - maxScrollPosition));
        map.setZoom(zoom);
        map.setCenter([newLng, newLat]);
    } else if (scrollPercentage >= reverseScrollPosition) {
        let zoomRange = 20;
        let zoom = calculateZoom(viewportWidth) - (zoomRange * (scrollPercentage - reverseScrollPosition));
        map.setZoom(zoom);
        map.setCenter([negLng, negLat]);
    } else {
        let zoomRange = 20;
        let zoom = calculateZoom(viewportWidth) - (zoomRange * scrollPercentage);
        map.setZoom(zoom);
        map.setCenter([negLng, negLat]);
    }
});


map.on('style.load', () => {
    map.setFog({
        'range': [-1, 2],
        'horizon-blend': 0.01,
        'color': '#fff',
        'high-color': 'transparent',
        'space-color': 'transparent',
        'star-intensity': 1
    });
});


// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = -120;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
let spinEnabled = true;

function spinGlobe() {
    const zoom = map.getZoom();
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif =
                (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
}

// Pause spinning on interaction
map.on('mousedown', () => {
    userInteracting = true;
});

// Restart spinning the globe when interaction is complete
map.on('mouseup', () => {
    userInteracting = false;
    spinGlobe();
});

// These events account for cases where the mouse has moved
// off the map, so 'mouseup' will not be fired.
map.on('dragend', () => {
    userInteracting = false;
    spinGlobe();
});
map.on('pitchend', () => {
    userInteracting = false;
    spinGlobe();
});
map.on('rotateend', () => {
    userInteracting = false;
    spinGlobe();
});

// When animation is complete, start spinning if there is no ongoing interaction
map.on('moveend', () => {
    spinGlobe();
});

document.getElementById('btn-spin').addEventListener('click', (e) => {
    spinEnabled = !spinEnabled;
    if (spinEnabled) {
        spinGlobe();
        e.target.innerHTML = 'Pause rotation';
    } else {
        map.stop(); // Immediately end ongoing animation
        e.target.innerHTML = 'Start rotation';
    }
});

spinGlobe();

