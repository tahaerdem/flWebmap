
mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYWVyZGVtb3p0dXJrIiwiYSI6ImNqZmZ1Nm9zNzM4N3gycW1tMGVreHJ0enQifQ.m_BVyHJ6Ukop8vUSasQv2w';
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
let zoom = calculateZoom(viewportWidth);
let initialZoom = zoom;
let initialLng = 15.2433;
let initialLat = -28.9637;


function checkScrollTop() {
    // Check if the scroll position is at the top
    if (window.scrollY === 0) {
        console.log("The page is scrolled back to the top.");
        // You can add any other actions you want to take here
    }
}

function calculateZoom(viewportWidth) {
    if (viewportWidth > 1179) {
        return Math.log2(1100 / 400); // Calculate zoom for 1100px width
    } else  if (viewportWidth < 1179 && viewportWidth > 765) {
        return Math.log2(1100 / 400); // Calculate zoom for 1100px width
    } else {
        return Math.log2(viewportWidth / 200);
    }
}

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

function getScrollPositionY() {
    return window.scrollY || document.documentElement.scrollTop;
}

// Event listener to handle scroll events
window.addEventListener('scroll', function() {
    var scrollTop = getScrollPositionY();
//    console.log('Scroll position:', scrollTop);
    return scrollTop;
});

window.addEventListener('resize', function() {

    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (window.scrollY === 0) {
        zoom = calculateZoom(viewportWidth);
        map.setZoom(zoom);
    } else {
        console.log("The page is already scrolled down.");
    }
});

document.addEventListener("DOMContentLoaded", (event) => {

    function frame01() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#mainTitle",
                start: 'center top',
                end: '250% -100%',
                pin: false,
                scrub: true,
                markers: false,
    
                onUpdate: self => {


                    console.log('ScrollTrigger onUpdate called'); // Debugging log
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 8;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (initialLng - center.lng) / 20;
                        latStep = (initialLat - center.lat) / 20;
                        zoomStep = (initialZoom - map.getZoom()) / 25;
                    } else {
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
    
                onLeave: self => {
                },
            },
        });
    }

    function frame02() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".SEC01",
                start: 'center center',
                end: '700% top',
                pin: true,
                scrub: true,
                markers: false, // Set to true for debugging, set to false to remove markers

                onUpdate: self => {
                    console.log('ScrollTrigger onUpdate called'); // Debugging log
                    const velocity = self.getVelocity();
                    console.log('Velocity:', velocity); // Debugging log
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 8;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('Forward velocity:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (initialLng - center.lng) / 100;
                        latStep = (initialLat - center.lat) / 100;
                        zoomStep = (5 - map.getZoom()) / 25;
                        console.log('Backward velocity:', velocity);
                    } else {
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

                onLeave: self => {
                    console.log('SEC02 Left')
                },
            },
        });
    }

    function frame03() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC02",
                start: 'bottom bottom',
                end: '500% top',
                pin: true,
                scrub: true,
                markers: false, // Set to true for debugging, set to false to remove markers
                
                onUpdate: self => {
                    console.log('ScrollTrigger onUpdate called'); // Debugging log
                    const velocity = self.getVelocity();
                    console.log('Velocity:', velocity); // Debugging log
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 11;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('Forward velocity:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (8 - map.getZoom()) / 15;
                        console.log('Backward velocity:', velocity);
                    } else {
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
        });
    }

    var master = gsap.timeline({
        markers: false;
        }
    );

    master
    .add(frame01())
    .add(frame02(), { onLeave: frame01 })
    .add(frame03(), { onLeave: frame02 })

    

    function checkScrollTop() {
        // Check if the scroll position is at the top
        if (window.scrollY === 0) {
            console.log("The page is scrolled back to the top.");
            
            // Fly the map back to the original position
            map.flyTo({
                center: [initialLng, initialLat],
                zoom: initialZoom,
                duration: 0, // Adjust the duration as needed
            });
            console.log("Map is reverted back to its initial position.");

        }
    }

    // Add an event listener to check the scroll position whenever the user scrolls
    window.addEventListener('scroll', checkScrollTop);

    // Initial check in case the page is already at the top when loaded
    checkScrollTop();
});


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