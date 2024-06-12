
mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYWVyZGVtb3p0dXJrIiwiYSI6ImNqZmZ1Nm9zNzM4N3gycW1tMGVreHJ0enQifQ.m_BVyHJ6Ukop8vUSasQv2w';
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
let zoom;

let initialLng = 15.2433;
let initialLat = -28.9637;

zoom = calculateZoom(viewportWidth);
let zoomInitial = zoom;
let initialZoom = calculateZoom(viewportWidth);

function checkScrollTop() {
    // Check if the scroll position is at the top
    if (window.scrollY === 0) {
        console.log("The page is scrolled back to the top.");
        // You can add any other actions you want to take here
    }
}

const map = new mapboxgl.Map({
    container: 'map',
    color: 'white',
    style: 'mapbox://styles/tahaerdemozturk/clwt6u2xg05k601nx3zbs1cun',
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
    //Title to Globe
    function frame01() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#mainTitle",
                start: 'bottom top',
                end: '250% -100%',
                pin: false,
                scrub: true,
                markers: false,
                
                onEnter: self => {
                    console.log('Entered')
                },
    
                onUpdate: self => {
                    console.log('ScrollTrigger onUpdate called'); // Debugging log
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 7.5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('Forward velocity:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (initialLng - center.lng) / 20;
                        latStep = (initialLat - center.lat) / 20;
                        zoomStep = (initialZoom - map.getZoom()) / 25;
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
                    console.log('Counter Left')
                },
            },
        });
    }

    //Counter
    function frame02() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC01",
                start: 'center center',
                end: () => `+=${window.innerHeight * 1.425}`,
                pin: true,
                scrub: true,
                markers: false, // Set to true for debugging, set to false to remove markers

                onUpdate: self => {
                    const startDate = new Date("February 1, 2024 00:00:00");
                    const endDate = new Date("February 6, 2024 04:17:35");
                    const totalDuration = endDate - startDate;
                    const dateTimeElement = document.getElementById("date-time");

                    // Calculate the progress (0 to 1)
                    let progress = self.progress;
                    
                    // Map progress to a range where 100% progress is at 50% scroll
                    if (progress > 0.5) {
                        progress = 1; // Cap progress at 1 (end date) for anything beyond 50% scroll
                    } else {
                        progress = progress * 2; // Scale the first half to cover 0 to 1 range
                    }

                    // Calculate the current time based on the progress
                    const currentTime = new Date(startDate.getTime() + totalDuration * progress);

                    // Format the current time
                    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
                    const formattedTime = currentTime.toLocaleString('en-US', options);
                    
                    // Update the text element
                    dateTimeElement.textContent = formattedTime;

                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 7.5;
    
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
                    map.jumpTo({
                        center: [37.166, 37.032],
                        zoom: 7.5,
                    });
                },
            },
        });
    }
    
    //First Earthquake
    function frame03() {
        const coordinates = [
            //Starting point
            [36.4818,36.2997],
            [36.7170,36.4946],
            [37.1285,36.6830],
            [37.2000,36.7487],
            [37.1970,36.7482],
            [37.4294,36.8945],
            [37.5298,37.2406],
            [37.6186,37.4264],
            [37.7963,37.6593],
            [37.8382,37.7488],
            [37.9009,37.8230],
            [37.9323,37.9489],
            [38.0372,38.3183],
            [38.0445,38.4375],
            [38.1123,38.5916],
            [38.2478,38.8551],
            [38.3224,39.0115],
            [38.5740,39.6450],
            [38.5852,39.7409],
            [38.7394,40.0488],
            [38.8462,40.5308],
            [38.8580,40.5620],
            [38.9846,40.7070],
            [39.1666,40.8970],
            [39.1713,40.9177],
            //EAF to NAF
            [39.3175,41.1361],
            //1939 Erzincan
            [39.9046,39.5871],
            //1942 Tokat
            [40.8681,36.4691],
            //1943 Tosya
            [40.8650,33.6504],
            //1944 Bolu Gerede
            [40.6944,32.9928],
            //1957 Abant
            [40.72969,31.09031],
            //1967 Mudurnu
            [40.66871,30.69164],
            //1999
            [40.74739,29.86486],
            //Istanbul
            [40.7852,28.9431]
        ];

        map.on('style.load', () => {
            console.log("Style loaded");
    
            // Ensure the source and layer are loaded
            map.once('idle', () => {
                console.log("Map is idle");
    
                if (coordinates.length) {
                    console.log("Provided Coordinates:", coordinates);
    
                    // Function to calculate distance between two points
                    const calculateDistance = (point1, point2) => {
                        const [lng1, lat1] = point1;
                        const [lng2, lat2] = point2;
                        return Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2));
                    };
    
                    // Interpolate between two points
                    const interpolate = (point1, point2, t) => {
                        const [lng1, lat1] = point1;
                        const [lng2, lat2] = point2;
                        const lng = lng1 + (lng2 - lng1) * t;
                        const lat = lat1 + (lat2 - lat1) * t;
                        return [lng, lat];
                    };
    
                    // Calculate total length of the path
                    let totalLength = 0;
                    const lengths = [];
                    for (let i = 0; i < coordinates.length - 1; i++) {
                        const length = calculateDistance(coordinates[i], coordinates[i + 1]);
                        lengths.push(length);
                        totalLength += length;
                    }
    
                    // Interpolated path based on the scroll progress
                    var tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: "#TL01",
                            start: 'top top',
                            end: '2000% top',
                            pin: true,
                            scrub: true,
                            markers: true,
    
                            onUpdate: self => {
                                const progress = self.progress * totalLength;
                                let currentLength = 0;
                                let index = 0;
                                while (index < lengths.length && currentLength + lengths[index] < progress) {
                                    currentLength += lengths[index];
                                    index++;
                                }
    
                                const remainingLength = progress - currentLength;
                                const t = remainingLength / lengths[index];
                                const target = interpolate(coordinates[index], coordinates[index + 1], t);
    
                                const targetLng = target[0];
                                const targetLat = target[1];
                                const targetZoom = 9;
    
                                map.easeTo({
                                    center: [targetLat, targetLng],
                                    zoom: targetZoom,
                                    duration: 0, // Keep duration 0 for smooth continuous movement
                                    easing: t => t // linear easing
                                });
                            },
                        },
                    });
                } else {
                    console.log('No coordinates provided.');
                }
            });
        });
    }
    
    //Grab the second earthquake timeline
    function frame04() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#TL02",
                start: 'top 95%',
                end: 'bottom top',
                pin: false,
                scrub: true,
                markers: false,
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 38.010;
                    const targetLng = 37.197;
                    const targetZoom = 7.5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('FRAME04:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (7.5 - map.getZoom()) / 15;
                        console.log('FRAME04', velocity);
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
                    map.jumpTo({
                        center: [37.197, 38.010],
                        zoom: 7.5,
                    });
                },
    
            },
        });
    }

    //Zoom into second EQ
    function frame05() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#TL03",
                start: '50% top', //Make it stop near the top, if wanna center it do 'top top'
                end: '600% top',
                pin: true,
                scrub: true,
                markers: false,
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 38.010;
                    const targetLng = 37.197;
                    const targetZoom = 9;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('FRAME05:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (7.5 - map.getZoom()) / 15;
                        console.log('FRAME05', velocity);
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
                    map.jumpTo({
                        center: [37.197, 38.010],
                        zoom: 9,
                    });
                },
    
            },
        });
    }

    //Black Section Timeline
    function frame06() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS01",
                start: 'top center', //Make it stop near the top, if wanna center it do 'top top'
                end: 'bottom top',
                pin: false,
                scrub: true,
                markers: false,
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 38.410;
                    const targetLng = 39.939;
                    const targetZoom = 6.5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('FRAME06:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (9 - map.getZoom()) / 15;
                        console.log('FRAME06', velocity);
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

    //Eastern Anatolia
    function frame07() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS02",
                start: 'top top',
                end: '2000% top',
                pin: true,
                scrub: true,
                markers: false,
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 38.410;
                    const targetLng = 39.939;
                    const targetZoom = 6.5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('FRAME07:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (7.5 - map.getZoom()) / 15;
                        console.log('FRAME07', velocity);
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
                    map.jumpTo({
                        center: [39.939, 38.410],
                        zoom: 6.5,
                    });
                },
    
            },
        });
    }

    //North Anatolia Textbox
    function frame08() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC04",
                start: 'top 60%', //Make it stop near the top, if wanna center it do 'top top'
                end: '500% top',
                pin: true,
                scrub: true,
                markers: false,
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 39.123;
                    const targetLng = 34.534;
                    const targetZoom = 6;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('FRAME08:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (6.5 - map.getZoom()) / 15;
                        console.log('FRAME08', velocity);
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

    //North Anatolia Timeline
    function frame09() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS04",
                start: 'top top',
                end: '5000% top',
                pin: true,
                scrub: true,
                markers: false,
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 39.123;
                    const targetLng = 34.534;
                    const targetZoom = 6;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                        console.log('FRAME09:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (6.5 - map.getZoom()) / 15;
                        console.log('FRAME09', velocity);
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

    //1999 Textbox
    function frame10() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC05",
                start: 'top 60%', //Make it stop near the top, if wanna center it do 'top top'
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 40.748;
                    const targetLng = 29.864;
                    const targetZoom = 8;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F09:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (6 - map.getZoom()) / 20;
                        console.log('F09', velocity);
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

    //1999 Timeline
    function frame11() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS06",
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
                end: '2500% top',
                pin: true,
                scrub: true,
                markers: false,

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 40.748;
                    const targetLng = 29.864;
                    const targetZoom = 8;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F11:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (6 - map.getZoom()) / 20;
                        console.log('F11', velocity);
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

    //Istanbul
    function frame12() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06",
                start: 'top 60%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.008;
                    const targetLng = 28.978;
                    const targetZoom = 9;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8 - map.getZoom()) / 15;
                        console.log('F10', velocity);
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

    //Istanbul Timeline
    function frame13() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS08",
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
                end: '5000% top',
                pin: true,
                scrub: true,
                markers: false,

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.008;
                    const targetLng = 28.978;
                    const targetZoom = 9;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8 - map.getZoom()) / 15;
                        console.log('F10', velocity);
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

    //Next steps for Istanbul
    function frame14() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS10",
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
                end: '1250% top',
                pin: true,
                scrub: true,
                markers: false,

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.008;
                    const targetLng = 28.978;
                    const targetZoom = 9;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8 - map.getZoom()) / 15;
                        console.log('F10', velocity);
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

    //Ways to Detect Risky Buildings
    function frame15() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS12",
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
                end: '2500% top',
                pin: true,
                scrub: true,
                markers: false,

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.008;
                    const targetLng = 28.978;
                    const targetZoom = 9;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8 - map.getZoom()) / 15;
                        console.log('F10', velocity);
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


    var master = gsap.timeline();

    master
    .add(frame01()) //Zoom into the earthquake zone
    .add(frame02(), { onLeave: frame01 }) //Zoom into the earthquake zone
    .add(frame03(), { onLeave: frame02 }) 
    .add(frame04(), { onLeave: frame03 }) 
    .add(frame05(), { onLeave: frame04 }) 
    .add(frame06(), { onLeave: frame05 }) 
    .add(frame07(), { onLeave: frame06 }) 
    .add(frame08(), { onLeave: frame07 })
    .add(frame09(), { onLeave: frame08 })
    .add(frame10(), { onLeave: frame09 })
    .add(frame11(), { onLeave: frame10 })
    .add(frame12(), { onLeave: frame11 })
    .add(frame13(), { onLeave: frame12 })
    .add(frame14(), { onLeave: frame13 })
    .add(frame15(), { onLeave: frame14 })

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