
mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYWVyZGVtb3p0dXJrIiwiYSI6ImNqZmZ1Nm9zNzM4N3gycW1tMGVreHJ0enQifQ.m_BVyHJ6Ukop8vUSasQv2w';
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
let zoom;

// Set the initial zoom level
zoom = calculateZoom(viewportWidth);
let zoomInitial = zoom;

const easingFunctions = {
    // start slow and gradually increase speed
    easeInCubic: function (t) {
        return t * t * t;
    },
    // start fast with a long, slow wind-down
    easeOutQuint: function (t) {
        return 1 - Math.pow(1 - t, 5);
    },
    // slow start and finish with fast middle
    easeInOutCirc: function (t) {
        return t < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    },
    // fast start with a "bounce" at the end
    easeOutBounce: function (t) {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }
};

const map = new mapboxgl.Map({
    container: 'map',
    color: 'white',
    style: 'mapbox://styles/tahaerdemozturk/clwt6u2xg05k601nx3zbs1cun/draft',
    zoom: zoom,
    center: [15.9637, -28.2433],
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

function getScrollPositionY() {
    return window.scrollY || document.documentElement.scrollTop;
}

// Event listener to handle scroll events
window.addEventListener('scroll', function() {
    var scrollTop = getScrollPositionY();
//    console.log('Scroll position:', scrollTop);
    return scrollTop;
});

document.addEventListener("DOMContentLoaded", (event) => {
    let frameAA = gsap.timeline({
        scrollTrigger: {
            start: '6% bottom',
            end: '250% -100%',
            scrub: true,
            markers: 0,
            invalidateOnRefresh: true, // Ensure recalculating on refresh

            onUpdate: self => {
                const velocity = self.getVelocity();
                const center = map.getCenter();
                const targetLng = 37.032;
                const targetLat = 37.166;
                const originalLng = 15.2433;
                const originalLat = -28.9637;
                const targetZoom = 8;
                const originalZoom = calculateZoom(viewportWidth);
                const scrollProgress = frameAA.scrollTrigger ? frameAA.scrollTrigger.progress : 0;

                let lngStep, latStep, zoomStep;

                if (velocity > 0 && window.scrollY > 0) {
                    // Forward animation steps
                    lngStep = (targetLng - center.lng) / 20;
                    latStep = (targetLat - center.lat) / 20;
                    zoomStep = (targetZoom - map.getZoom()) / 25;
                    console.log('1', velocity);
                } else if (velocity > 0 && window.scrollY < 0) {
                    lngStep = (originalLng - center.lng) / 120;
                    latStep = (originalLat - center.lat) / 120;
                    zoomStep = (originalZoom - map.getZoom()) / 25;
                    console.log('Hello', scrollTop);
                } else if (velocity < 0 && window.scrollY > 0) {
                    // Reverse animation steps
                    lngStep = (originalLng - center.lng) / 20;
                    latStep = (originalLat - center.lat) / 20;
                    zoomStep = (originalZoom - map.getZoom()) / 25;
                    console.log('3', velocity);
                } else if (velocity < 0 && window.scrollY <= 0) {
                    if (center.lng === originalLng && center.lat === originalLat && map.getZoom() === original) {
                        console.log('BACK TO OG', velocity);
                    } else {
                        map.flyTo({
                            center: [originalLng, originalLat],
                            zoom: originalZoom,
                            duration: 0,

                        })
                    }
                    lngStep = (originalLng - center.lng) / 120;
                    latStep = (originalLat - center.lat) / 120;
                    zoomStep = (originalZoom - map.getZoom()) / 25;
                    console.log('4', velocity);
                } else {
                    // No animation steps
                    lngStep = 0;
                    latStep = 0;
                    zoomStep = 0;
                }

                map.easeTo({
                    center: [center.lng + lngStep, center.lat + latStep],
                    zoom: map.getZoom() + zoomStep,
                    duration: 0,
                    easing: t => t // linear easing
                });
            },
        },
        opacity: 1, // Adjust opacity as needed
        ease: "none",
    });
});



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


// Update zoom level on window scroll


map.on('style.load', () => {
    map.setFog({
        'range': [-1, 2],
        'horizon-blend': 0.012,
        'color': '#fff',
        'high-color': '#fff',
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

