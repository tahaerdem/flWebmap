
mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYWVyZGVtb3p0dXJrIiwiYSI6ImNqZmZ1Nm9zNzM4N3gycW1tMGVreHJ0enQifQ.m_BVyHJ6Ukop8vUSasQv2w';
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
let zoom;
let mapActive = true;

let initialLng = 15.2433;
let initialLat = -28.9637;

zoom = calculateZoom(viewportWidth);
let zoomInitial = zoom;
let initialZoom = calculateZoom(viewportWidth);

let flInitialZoom = 19;

const istanbulBounds = [
    [28.4, 40.7], // Southwest coordinates
    [29.4, 41.3]  // Northeast coordinates
];

function checkScrollTop() {
    if (window.scrollY === 0) {
        console.log("The page is scrolled back to the top.");
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

const flMap = new mapboxgl.Map({
    container: 'flMap',
    style: 'mapbox://styles/tahaerdemozturk/clyhz0gtq01nt01qo3ynh5244',
    zoom: flInitialZoom,
    center: [28.840361, 40.998400],
    scrollZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: true,
    touchZoomRotate: false,
    touchPitchHandler: false,
    attributionControl: false,
    maxBounds: istanbulBounds,
});

function getScrollPositionY() {
    return window.scrollY || document.documentElement.scrollTop;
}

window.addEventListener('scroll', function() {
    var scrollTop = getScrollPositionY();
    return scrollTop;
});

document.addEventListener("resize", (event) => {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    zoom = calculateZoom(viewportWidth);
    map.setZoom(zoom);
});

document.addEventListener("DOMContentLoaded", (event) => {
    //Title to Globe
    function frame01() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#mainTitle",
                start: '50% top',
                end: '250% -100%',
                pin: false,
                scrub: true,
                markers: false,
                
                onEnter: self => {
                },
    
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
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
                        easing: t => t
                    });
                },
    
                onLeave: self => {
                },
            },
        });
    }

    //Counter
    function frame02() {
        const layersToToggle = [];
        const layersToHide = ['feb6-eq-circle-stroke-start', 'feb6-eq-circle-stroke-start-t', 'feb6-eq-circle-stroke-end', 'feb6-eq-circle-stroke-end-t'];

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
                    const targetZoom = 5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (initialLng - center.lng) / 100;
                        latStep = (initialLat - center.lat) / 100;
                        zoomStep = (5 - map.getZoom()) / 25;
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

                onEnter: () => {
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onEnterBack: () => {
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeaveBack: () => {
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeave: self => {
                    map.jumpTo({
                        center: [37.166, 37.032],
                        zoom: 5,
                        duration: 1,
                        easing: t => t // linear easing
                    });

                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
            },
        });
    }

    //Grab the first earthquake timeline
    function frame03() {
        const layersToToggle = ['feb6-eq-circle-stroke-start', 'feb6-eq-circle-stroke-start-t'];
        const layersToHide = ['feb6-eq-circle-stroke-end', 'feb6-eq-circle-stroke-end-t'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#TL01",
                start: 'top top',
                end: '1400% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLng = 37.032;
                    const targetLat = 37.166;
                    const targetZoom = 7.5;
                    const f02Lng = 37.032;
                    const f02Lat = 37.166;
                    const f02Zoom = 5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 25;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (f02Lng - center.lng) / 100;
                        latStep = (f02Lat - center.lat) / 100;
                        zoomStep = (f02Zoom - map.getZoom()) / 50;
                    } else {
                        lngStep = 0;
                        latStep = 0;
                        zoomStep = 0;
                    } 
    
                    map.easeTo({
                        center: [center.lng + lngStep, center.lat + latStep],
                        zoom: map.getZoom() + zoomStep,
                        duration: 0,
                        easing: t => t
                    });
                },
            },
        });

    }

    //In-between two quakes
    function frame04() {
        const layersToToggle = [];
        const layersToToggleWhenLeft = ['feb6-eq-circle-stroke-end', 'feb6-eq-circle-stroke-end-t'];
        const earthquakeLayer = 'feb6-eq-circle-stroke';
        const sourceLayer = 'usgs-feb67-eq-data-0ezrpr';
        const startTime = 1675646254342;
        const endTime = 1675689088811;
      
      
        map.on('idle', () => {
          const features = map.querySourceFeatures('composite', {
            sourceLayer: sourceLayer,
          }).sort((a, b) => a.properties.time - b.properties.time)
            .filter(f => f.properties.time >= startTime && f.properties.time <= endTime);
      
          if (features.length === 0) {
            return;
          }
      
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: "#TL02",
              start: 'top bottom',
              end: 'bottom top',
              pin: false,
              scrub: true,
              markers: false,
      
              onEnter: () => {
                layersToToggle.forEach(layerId => {
                  map.setLayoutProperty(layerId, 'visibility', 'visible');
                });
                map.setLayoutProperty(earthquakeLayer, 'visibility', 'visible');
              },
      
              onEnterBack: () => {
                layersToToggle.forEach(layerId => {
                  map.setLayoutProperty(layerId, 'visibility', 'visible');
                });
                map.setLayoutProperty(earthquakeLayer, 'visibility', 'visible');
              },
      
              onLeaveBack: () => {
                layersToToggle.forEach(layerId => {
                  map.setLayoutProperty(layerId, 'visibility', 'visible');
                });
                map.setLayoutProperty(earthquakeLayer, 'visibility', 'none');
              },
      
              onUpdate: self => {
                const progress = self.progress * 4;
                const totalFeatures = features.length;
                let currentFeatureIndex = Math.floor(progress * totalFeatures);
      
                // Ensure currentFeatureIndex is within bounds
                currentFeatureIndex = Math.max(0, Math.min(currentFeatureIndex, totalFeatures - 1));
      
                const velocity = self.getVelocity();
      
                let filter, currentDate;
                if (velocity >= 0 && window.scrollY > 0) {
                  filter = [
                    "all",
                    ["<=", ["get", "time"], features[currentFeatureIndex].properties.time]
                  ];
                  currentDate = features[currentFeatureIndex].properties.time;
                } else if (velocity < 0 && window.scrollY > 0) {
                  currentFeatureIndex = Math.max(currentFeatureIndex - 1, 0);
                  filter = [
                    "all",
                    ["<=", ["get", "time"], features[currentFeatureIndex].properties.time]
                  ];
                  currentDate = features[currentFeatureIndex].properties.time;
                }
      
                map.setFilter(earthquakeLayer, filter);
      
              },
      
              onLeave: () => {
                map.setLayoutProperty(earthquakeLayer, 'visibility', 'visible');
                const lastFeature = features[features.length - 1];
                const filter = [
                  "all",
                  ["<=", ["get", "time"], lastFeature.properties.time]
                ];
                map.setFilter(earthquakeLayer, filter);
                layersToToggleWhenLeft.forEach(layerId => {
                    map.setLayoutProperty(layerId, 'visibility', 'visible');
                });
              },
            },
          });
        });
    }
    
    //Get the second timeline
    function frame05() {
        const layersToToggle = ['feb6-eq-circle-stroke-end', 'feb6-eq-circle-stroke-end-t'];
        const layersToHide = [];
        
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#TL03",
                start: '50% top',
                end: '250% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 38.010;
                    const targetLng = 37.197;
                    const targetZoom = 7.5;
                    const progress = self.progress;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (7.5 - map.getZoom()) / 15;
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
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
    
            },
        });
    }

    //EAF Chapter Intro
    function frame052() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS00",
                start: 'top top',
                end: '700% 27%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {
                },
                onEnterBack: () => {
                },
                onLeaveBack: () => {
                },
    
                onUpdate: self => {
                    const title = document.getElementById('fs00Title');
                    const container = document.getElementById('FS00');
                    const margin = document.getElementById('chp01');
                    const initialContainerHeight = 300;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },

            },
        });
    }

    //EAF Section
    function frame06() {
        const layersToToggle = ['Fault-Paths-L01-EAF'];
        const layersToHide = [];
        const dateDisplay = document.getElementById('date-time-scroll-counter');
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS01",
                start: 'top center',
                end: 'bottom top',
                pin: false,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 38.410;
                    const targetLng = 39.939;
                    const targetZoom = 6.5;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (9 - map.getZoom()) / 15;
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
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
    
            },
        });
    }

    //Eastern Anatolia
    function frame07() {
        const layersToToggle = [];
        const layersToHide = [];
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS02",
                start: 'top top',
                end: '2000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                
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
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (7.5 - map.getZoom()) / 15;
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

                onRefresh: self => {
                    const pinnedElement = self.pin;
                    pinnedElement.style.width = '100%';
                    pinnedElement.style.maxWidth = '100%';
                },

            },
        });
    }

    //NAF Chapter Intro
    function frame072() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS032",
                start: 'top top',
                end: '400% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    const title = document.getElementById('fs0003Title');
                    const container = document.getElementById('FS032');
                    const margin = document.getElementById('chp02');

                    const initialContainerHeight = 300;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    //North Anatolia Textbox
    function frame08() {
        const layersToToggle = ['Fault-Paths-L02-NAF'];
        const layersToHide = ['feb6-eq-circle-stroke-start-t', 'feb6-eq-circle-stroke-end-t'];
        const hideonLeave = ['Fault-Paths-L01-EAF'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC04",
                start: 'top 60%',
                end: '500% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
        
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
        
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },
                
                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 39.123;
                    const targetLng = 34.534;
                    const targetZoom = 6;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (targetZoom - map.getZoom()) / 15;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (6.5 - map.getZoom()) / 15;
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

                onLeave: () => {
                    map.jumpTo({
                        center: [34.534, 39.123],
                        zoom: 6,
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
    
            },
        });
    }

    function frame09() {
        const earthquakeLayers = [
            '1939', '1939-T', '1939-P', '1942', '1942-T', '1942-P', '1943', '1943-T',
            '1944', '1944-T', '1944-P', '1957', '1957-T', '1957-P', '1967', '1967-T', '1967-P',
            '1999', '1999-T',
        ];
    
        const sourceLayers = [
            'major-earthquakes-on-NAF-8y0uiu',
            'gem_active_faults_harmonized-9xzarf'
        ];
    
        let targetPositions = [];
        let currentVisibleLayers = new Set();
        let lastUpdateTime = 0;
        const updateInterval = 50; // ms
    
        // Simple debounce function
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    
        // Web Worker for heavy computations
        const worker = new Worker(URL.createObjectURL(new Blob([`
            self.onmessage = function(e) {
                const { earthquakeLayers, featureData } = e.data;
                const targetPositions = [];
    
                const totalLayers = earthquakeLayers.length;
                const step = 1 / totalLayers;
    
                for (let i = 0; i < totalLayers; i++) {
                    const layer = earthquakeLayers[i];
                    const coordinates = featureData[layer];
                    if (coordinates) {
                        const targetLat = coordinates[1];
                        const targetLng = coordinates[0];
                        const targetZoom = 6 + (10 - 6) * (i / totalLayers);
                        targetPositions.push({ lat: targetLat, lng: targetLng, zoom: targetZoom });
                    }
                }
    
                self.postMessage({ targetPositions });
            };
        `])));
    
        worker.onmessage = function(e) {
            targetPositions = e.data.targetPositions;
        };
    
        map.on('styledata', function () {
            if (map.isStyleLoaded()) {
                const featureData = {};
    
                earthquakeLayers.forEach(layer => {
                    for (const sourceLayer of sourceLayers) {
                        const features = map.querySourceFeatures('composite', {
                            sourceLayer: sourceLayer,
                            filter: ['==', 'name', layer]
                        });
                        if (features.length > 0) {
                            featureData[layer] = features[0].geometry.coordinates[0];
                            break;
                        }
                    }
                });
    
                worker.postMessage({ earthquakeLayers, featureData });
            }
        });
    
        function binarySearchStep(progress) {
            let low = 0, high = earthquakeLayers.length - 1;
            const step = 1 / earthquakeLayers.length;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                if ((mid * step) <= progress && progress < ((mid + 1) * step)) {
                    return mid;
                } else if (progress < (mid * step)) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            return low;
        }
    
        function updateLayerVisibility(currentStep) {
            const newVisibleLayers = new Set(earthquakeLayers.slice(0, currentStep + 1));
            const toShow = [...newVisibleLayers].filter(x => !currentVisibleLayers.has(x));
            const toHide = [...currentVisibleLayers].filter(x => !newVisibleLayers.has(x));
    
            if (toShow.length > 0 || toHide.length > 0) {
                requestAnimationFrame(() => {
                    toShow.forEach(layerId => map.setLayoutProperty(layerId, 'visibility', 'visible'));
                    toHide.forEach(layerId => map.setLayoutProperty(layerId, 'visibility', 'none'));
                    currentVisibleLayers = newVisibleLayers;
                });
            }
        }
    
        const update = (self) => {
            const now = performance.now();
            if (now - lastUpdateTime < updateInterval) return;
            lastUpdateTime = now;
    
            const progress = self.progress;
            const currentStep = binarySearchStep(progress);
    
            updateLayerVisibility(currentStep);
    
            if (currentStep < 0 || currentStep >= targetPositions.length) return;
    
            const targetPosition = targetPositions[currentStep];
            if (!targetPosition) return;
    
            const center = map.getCenter();
            const currentZoom = map.getZoom();
    
            const lngDiff = Math.abs(targetPosition.lng - center.lng);
            const latDiff = Math.abs(targetPosition.lat - center.lat);
            const zoomDiff = Math.abs(targetPosition.zoom - currentZoom);
    
            if (lngDiff > 0.001 || latDiff > 0.001 || zoomDiff > 0.01) {
                requestAnimationFrame(() => {
                    map.easeTo({
                        center: [targetPosition.lng, targetPosition.lat],
                        zoom: targetPosition.zoom,
                        duration: 0,
                        easing: t => t
                    });
                });
            }
        };
    
        const debouncedUpdate = debounce(update, 16); // 60fps
    
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS04",
                start: 'top top',
                end: '5000% top',
                pin: true,
                scrub: true,
                markers: false,
                onRefresh: self => {
                    const pinnedElement = self.pin;
                    pinnedElement.style.width = '100%';
                    pinnedElement.style.maxWidth = '100%';
                },
                onUpdate: debouncedUpdate
            }
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
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (6 - map.getZoom()) / 20;
                    } else {
                        lngStep = 0;
                        latStep = 0;
                        zoomStep = 0;
                    }
    
                    map.easeTo({
                        center: [center.lng + lngStep, center.lat + latStep],
                        zoom: map.getZoom() + zoomStep,
                        duration: 0,
                        easing: t => t
                    });
    
                },
    
            },
        });
    }

    //1999 Chapter Intro
    function frame102() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS052",
                start: 'top top',
                end: '400% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    const title = document.getElementById('fs052Title');
                    const container = document.getElementById('FS052');
                    const margin = document.getElementById('chp03');
                    
                    const initialContainerHeight = 300;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    //1999 Timeline
    function frame11() {

        var tl = gsap.timeline({

            scrollTrigger: {
                trigger: "#FS06",
                start: 'top top',
                end: '2500% top',
                pin: true,
                scrub: true,
                markers: false,

                onRefresh: self => {
                    const pinnedElement = self.pin;
                    pinnedElement.style.width = '100%';
                    pinnedElement.style.maxWidth = '100%';
                },

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
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (6 - map.getZoom()) / 20;
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

    // Istanbul
    function frame12() {
        const isoToggler = ['ISO-land'];
        const boundariesToToggle = ['L3_AdminBoundaries_Base', 'L2_AdminBoundaries_Base'];
        const layersToToggle = ['L3_Base'];
        const layersToEase = ['ISO-land'];
        const layersToHide = [
            'L3_Shelter',
            'L3_Population',
            'L3_AdminBoundaries',
            'L2_AdminBoundaries',
            '1939',
            '1939-T',
            '1939-P',
            '1942',
            '1942-T',
            '1942-P',
            '1943',
            '1943-T',
            '1944',
            '1944-T',
            '1944-P',
            '1957',
            '1957-T',
            '1957-P',
            '1967',
            '1967-T',
            '1967-P',
            '1999',
            '1999-T'
        ];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    isoToggler.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    isoToggler.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    isoToggler.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 8.75;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8 - map.getZoom()) / 15;
                    } else {
                        lngStep = 0;
                        latStep = 0;
                        zoomStep = 0;
                    }

                    map.easeTo({
                        center: [center.lng + lngStep, center.lat + latStep],
                        zoom: map.getZoom() + zoomStep,
                        duration: 0,
                        easing: t => t 
                    });
                },
            },
        });

        map.on('load', () => {
            setTimeout(() => {
                if (map.getLayer('ISO-land')) {
                    map.setPaintProperty('ISO-land', 'background-opacity', 0);
                }
            }, 1000);
        });
    }

    //Population
    function frame121() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_Population'];
        const layersToEase = [];
        const layersToHide = ['L3_Shelter'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-1",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

        map.on('load', () => {
            setTimeout(() => {
                if (map.getLayer('ISO-land')) {
                    map.setPaintProperty('ISO-land', 'background-opacity', 0);
                }
            }, 1000);
        });
    }

    //Shelter
    function frame122() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_Shelter', 'L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToEase = [];
        const layersToHide = ['L3_Population'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-2",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

        map.on('load', () => {
            setTimeout(() => {
                if (map.getLayer('ISO-land')) {
                    map.setPaintProperty('ISO-land', 'background-opacity', 0);
                }
            }, 1000);
        });
    }

    //Low Damage
    function frame123() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_LowDamage'];
        const layersToEase = [];
        const layersToHide = ['L3_Shelter'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-3",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

    //Medium Damage
    function frame124() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_MediumDamage'];
        const layersToEase = [];
        const layersToHide = ['L3_LowDamage'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-4",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

    //Heavy Damage
    function frame125() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_HeavyDamage'];
        const layersToEase = [];
        const layersToHide = ['L3_MediumDamage'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-5",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

    //Extremely Heavy Damage
    function frame126() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_ExtremelyHeavyDamage'];
        const layersToEase = [];
        const layersToHide = ['L3_HeavyDamage'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-6",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

    //Death Toll
    function frame127() {
        const boundariesToToggle= ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_Death'];
        const layersToEase = [];
        const layersToHide = ['L3_ExtremelyHeavyDamage'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#SEC06-7",
                start: 'top 75%',
                end: '1000% top',
                pin: true,
                scrub: true,
                markers: false,

                onEnter: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeave: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 1);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToEase.forEach(layerId => {
                        if (map.getLayer(layerId)) {
                            map.setPaintProperty(layerId, 'background-opacity-transition', { duration: 500 });
                            map.setPaintProperty(layerId, 'background-opacity', 0);
                        }
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },

                onUpdate: self => {
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.058;
                    const targetLng = 28.978;
                    const targetZoom = 9;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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

    //Istanbul Intro
    function frame132() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS072",
                start: 'top top',
                end: '400% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    const title = document.getElementById('fs072Title');
                    const container = document.getElementById('FS072');
                    const margin = document.getElementById('chp04');
                    
                    const initialContainerHeight = 300;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    //Istanbul Timeline
    function frame13() {    
        const boundariesToToggle = ['L3_AdminBoundaries', 'L2_AdminBoundaries'];
        const layersToToggle = ['L3_Shelter'];
        const layersToHide = ['country-label','Turkey-L01','Fault-Paths-L01','Fault-Paths-L03','1939','1939-T','1939-P','1942','1942-T','1942-P','1943','1943-T','1944','1944-T','1944-P','1957','1957-T','1957-P','1967','1967-T','1967-P','1999','1999-T','hillshade'];
        
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS08",
                start: 'top top',
                end: '1500% top',
                pin: true,
                scrub: true,
                markers: false,
    
                onRefresh: self => {
                    const pinnedElement = self.pin;
                    pinnedElement.style.width = '100%';
                    pinnedElement.style.maxWidth = '100%';
                },
    
                onEnter: () => {
                    mapActive = true;
                    console.log('Map deactivated');
                    map.getCanvas().style.opacity = '1';
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },

                onLeave: () => {
                },
                
                    
                onEnterBack: () => {
                    mapActive = true;
                    console.log('Map reactivated');
                    map.getCanvas().style.opacity = '1';
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                },
                onLeaveBack: () => {
                    mapActive = true;
                    map.getCanvas().style.opacity = '1'; // Show the map
                    boundariesToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                },
                onUpdate: self => {
                    if (!mapActive) return;
    
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.158;
                    const targetLng = 28.978;
                    const targetZoom = 8.75;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8.75 - map.getZoom()) / 15;
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
    
    //Dissecting Collapse intro
    function frame131() {
        const mapElement = document.getElementById('map');

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS0911",
                start: 'top top',
                end: '2000% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    map.resize();

                    const title = document.getElementById('fs00911Title');
                    const container = document.getElementById('FS0911');
                    const margin = document.getElementById('chp05');
                    
                    const initialContainerHeight = 300;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                    mapElement.style.display = 'none';
                },

                onEnter: () => {
                    document.getElementById('flMap').style.display = 'none';
                },

                onLeaveBack: () => {
                    document.getElementById('flMap').style.display = 'fixed';
                }

            },
        });
    }

    //Artificial Intelligence intro
    function frame141() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS092",
                start: 'top top',
                end: '2000% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    map.resize();

                    const title = document.getElementById('fs0092Title');
                    const container = document.getElementById('FS092');
                    const margin = document.getElementById('chp06');
                    
                    const initialContainerHeight = 300;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    //Interactive Map Intro
    function frame151() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS00112",
                start: 'top top',
                end: '450% 22%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    map.resize();

                    const title = document.getElementById('fs00112Title');
                    const container = document.getElementById('FS00112');
                    const margin = document.getElementById('chp07');
                    
                    const initialContainerHeight = 252;
                    const progress = self.progress;

                    const windowWidth = window.innerWidth;
                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }

                    if (windowWidth < 1024) {
                        newFontSize = 7 - (progress * 3);
                        if (newFontSize < 6) {
                            newFontSize = 6;
                        }                   
                    } 
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    function frame15() {
        const tabtitle = document.getElementById('tab-title');
        
        gsap.set(tabtitle, { opacity: 0 });
      
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#FS12",
            start: 'top top',
            end: '7000% top',
            pin: true,
            scrub: true,
            markers: false,
            onRefresh: self => {
              const pinnedElement = self.pin;
              pinnedElement.style.width = '100%';
              pinnedElement.style.maxWidth = '100%';
            },
            onUpdate: self => {
              const progress = self.progress;
              gsap.to(tabtitle, {
                opacity: 1,
                duration: 1,
                ease: 'none'
              });
            },
          },
        });
    }

    let animationCompleted = false;

    function frame0001() {
        const maxZoom = 20;
        const minZoom = 14.5;
        const mapElement = document.getElementById('flMap');
    
        return gsap.timeline({
            scrollTrigger: {
                trigger: mapElement,
                start: 'top top',
                end: '+=200%', // Adjust this value to control the scroll distance for zooming
                pin: true,
                pinSpacing: true,
                scrub: 1,
                markers: false,
                onEnter: () => {
                    flMap.setZoom(maxZoom);
                },
                onUpdate: self => {
                    if (animationCompleted) return;
    
                    const flcenter = flMap.getCenter();
                    const fltargetLat = 40.998400;
                    const fltargetLng = 28.840361;
                    const currentZoom = flMap.getZoom();
                    const zoomRange = maxZoom - minZoom;
                    const scrollProgress = self.progress;
    
                    const targetZoom = maxZoom - (zoomRange * scrollProgress);
    
                    let fllngStep = (fltargetLng - flcenter.lng) * 0.1;
                    let fllatStep = (fltargetLat - flcenter.lat) * 0.1;
                    let flzoomStep = (targetZoom - currentZoom) * 0.2;
    
                    flMap.jumpTo({
                        center: [flcenter.lng + fllngStep, flcenter.lat + fllatStep],
                        zoom: currentZoom + flzoomStep,
                        duration: 0
                    });
    
                    if (currentZoom <= minZoom + 1) {
                        animationCompleted = true;
                        self.kill(true);
                        gsap.set(mapElement, { clearProps: "all" });
                      
                        gsap.delayedCall(1, function() {
                          flMap.scrollZoom.enable();
                          flMap.doubleClickZoom.enable();
                          flMap.boxZoom.enable();
                          flMap.touchZoomRotate.enable();
                          flMap.dragRotate.disable();
                          flMap.dragPan.enable();
                          flMap.touchPitch.disable();
                          
                          if (flMap.getAttributionControl()) {
                            flMap.removeControl(flMap.getAttributionControl());
                          }
                      
                          console.log("Map controls enabled after 1 second delay");
                        });
                      }
                },
                onLeave: self => {
                    if (!animationCompleted) {
                        gsap.to(flMap, {
                            duration: 1,
                            zoom: maxZoom,
                            ease: "power2.out",
                            onUpdate: () => flMap.fire('zoom')
                        });
                    }
                },
                onLeaveBack: self => {
                    if (!animationCompleted) {
                        gsap.to(flMap, {
                            duration: 1,
                            zoom: maxZoom,
                            ease: "power2.out",
                            onUpdate: () => flMap.fire('zoom')
                        });
                    }
                }
            }
        });
    }
    var master = gsap.timeline();

    master
    .add(frame01())
    .add(frame02(), { onLeave: frame01 })
    .add(frame03(), { onLeave: frame02 }) 
    .add(frame04(), { onLeave: frame03 }) 
    .add(frame05(), { onLeave: frame04 })
    .add(frame052(), { onLeave: frame05 }) 
    .add(frame06(), { onLeave: frame05 }) 
    .add(frame07(), { onLeave: frame06 }) 
    .add(frame072(), { onLeave: frame07 }) 
    .add(frame08(), { onLeave: frame07 })
    .add(frame09(), { onLeave: frame08 })
    .add(frame10(), { onLeave: frame09 })
    .add(frame102(), { onLeave: frame10 })
    .add(frame11(), { onLeave: frame10 })
    .add(frame12(), { onLeave: frame11 })
    .add(frame121(), { onLeave: frame12 })
    .add(frame122(), { onLeave: frame121 })
    .add(frame123(), { onLeave: frame122 })
    .add(frame124(), { onLeave: frame123 })
    .add(frame125(), { onLeave: frame124 })
    .add(frame126(), { onLeave: frame125 })
    .add(frame127(), { onLeave: frame126 })
    .add(frame132(), { onLeave: frame127 })
    .add(frame13(), { onLeave: frame132 })
    .add(frame131(), { onLeave: frame13 })
    .add(frame141(), { onLeave: frame131 })
    .add(frame151(), { onLeave: frame141 })
    .add(frame15(), { onLeave: frame151 })
    .add(frame0001(), { onLeave: frame15 })


    function checkScrollTop() {
        if (window.scrollY === 0) {
            
            map.flyTo({
                center: [initialLng, initialLat],
                zoom: initialZoom,
                duration: 0,
            });
        }
    }

    window.addEventListener('scroll', checkScrollTop);
    checkScrollTop();
});

function calculateZoom(viewportWidth) {
    if (viewportWidth > 1179) {
        return Math.log2(1100 / 400); // Calculate zoom for 1100px width
    } else  if (viewportWidth < 1179 && viewportWidth > 765) {
        return Math.log2(1100 / 400); // Calculate zoom for 1100px width
    } else {
        return Math.log2(viewportWidth / 200);
    }
}

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

function getColorForAdjacency(adjacency) {
    const colorStops = [
        { value: 0.036190871149302, color: "#ed4426" },
        { value: 0.15, color: "#ed665a" },
        { value: 0.25, color: "#f2a085" },
        { value: 0.35, color: "#f2c194" },
        { value: 0.5, color: "#f8eab4" },
        { value: 0.75, color: "#d3dfaf" },
        { value: 1, color: "#a8bd93" },
        { value: 5, color: "#79b484" }
    ];

    if (adjacency === 0) return "#FFF27B";

    for (let i = 0; i < colorStops.length - 1; i++) {
        if (adjacency >= colorStops[i].value && adjacency < colorStops[i + 1].value) {
            return colorStops[i].color;
        }
    }

    return colorStops[colorStops.length - 1].color;
}

function getSafetyLevel(adjacencyValue) {
    if (adjacencyValue < 0.036190871149302) {
        return "Critical Risk";
    } else if (adjacencyValue < 0.15) {
        return "High Risk";
    } else if (adjacencyValue < 0.25) {
        return "Moderate Risk";
    } else if (adjacencyValue < 0.35) {
        return "Low Risk";
    } else if (adjacencyValue < 0.5) {
        return "Minimal Risk";
    } else if (adjacencyValue < 0.75) {
        return "Negligible Risk";
    } else {
        return "No Risk";
    }
}

function handleImageError(img) {
    console.error("Could not find street imagery", img.src);
    img.src = 'https://github.com/tahaerdem/flWebmap/blob/main/resources/images/prototype-box-3.svg?raw=true';
    img.onerror = null;
}

function showPopup(e, sourceLayer) {
    const feature = e.features[0];
    const coordinates = e.lngLat;
    const adjacencyValue = Number.parseFloat(feature.properties.adjacency);
    const formattedScore = adjacencyValue.toFixed(3);
    const backgroundColor = getColorForAdjacency(adjacencyValue);
    const safetyLevel = getSafetyLevel(adjacencyValue);
    console.log("ptindex: " + feature.properties['pointindex'] + ", svi-path: " + feature.properties['svi1_pth']);
    const popupContent = `
        <div class="flMap-popup-wrapper">
            <div class="flMap-popup-header" style="background-color: ${backgroundColor};">
                <p class="mono flMap-popup-small-header">${feature.properties.index}</p>
                <h3>${safetyLevel}</h3>
            </div>
            <div class="flMap-popup-content">
                <div class="flMap-popup-row"><p class="flMap-popup-t3">Building Type:</p><p class="flMap-popup-t4">${feature.properties.type}</p></div>
                <div class="flMap-popup-row"><p class="flMap-popup-t3">Floor:</p><p class="flMap-popup-t4">${feature.properties.story}</p></div>
                <div class="flMap-popup-row"><p class="flMap-popup-t3">Height:</p><p class="flMap-popup-t4">${feature.properties.height}</p></div>
                <div class="flMap-popup-row"><p class="flMap-popup-t3">District:</p><p class="flMap-popup-t4">${feature.properties.boro}</p></div>
                <div class="flMap-popup-row"><p class="flMap-popup-t3">ZIP:</p><p class="flMap-popup-t4">${feature.properties.ZIP}</p></div>
                <div class="flMap-popup-row"><figure class="flMap-popup-svi"><img height="200px" style="mix-blend-mode: darken;" src="https://github.com/tahaerdem/flWebmap/blob/main/resources/data/svi/40187/SVI-${feature.properties['pointindex']}.png?raw=true" onerror="handleImageError(this);"/></figure></div>
                <div class="flMap-popup-row"><p class="flMap-popup-t3">Adjacency Score:</p><p class="flMap-popup-t4 flwptp-rect" style="border: 1.5px solid ${backgroundColor}; color: ${backgroundColor}">${formattedScore}</p></div>
            </div>
        </div>
    `;
    const popup = new mapboxgl.Popup({
        className: 'flMap-popup',
        closeButton: true,
        maxWidth: '500px'
    })
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(flMap);
    
    // Add Escape key listener
    const escapeListener = (e) => {
        if (e.key === 'Escape') {
            popup.remove();
            document.removeEventListener('keydown', escapeListener);
        }
    };
    document.addEventListener('keydown', escapeListener);
    
    // Remove the listener when the popup is closed
    popup.on('close', () => {
        document.removeEventListener('keydown', escapeListener);
    });

    setTimeout(() => {
        const popupElement = popup.getElement();
        const headerElement = popupElement.querySelector('.flMap-popup-header');
        const tipElement = popupElement.querySelector('.mapboxgl-popup-tip');
        headerElement.style.backgroundColor = backgroundColor;
        tipElement.style.borderBottomColor = backgroundColor;
        popupElement.classList.add('flMap-popup-anchor-top');
    }, 0);
}

flMap.on('load', () => {
    flMap.addSource('40187_LEFT_SVIPATH_SERVERSOURCE', {
        type: 'geojson',
        data: `https://files.cargocollective.com/c483709/40187_LEFT_SVIPATH.geojson`,
        generateId: true
    });

    flMap.addSource('40187_RIGHT_SVIPATH_SERVERSOURCE', {
    type: 'geojson',
    data: `https://files.cargocollective.com/c483709/40187_RIGHT_SVIPATH.geojson`,
    generateId: true
    });

    flMap.addSource('40187_ADJACENCY_SERVERSOURCE', {
        type: 'geojson',
        data: `https://files.cargocollective.com/c483709/40187_ADJACENCY.geojson`,
        generateId: true
    });

    //40187 Buildings Left Fill Layer
    flMap.addLayer({
        id: '40187_BUILDINGS_LEFT',
        type: 'fill',
        source: '40187_LEFT_SVIPATH_SERVERSOURCE',
        filter: [
            "!=",
            ["get", "adjacency"],
            0
        ],
        paint: {
            'fill-color': [
                "case",
                [
                    "boolean",
                    [
                        "feature-state",
                        "hover"
                    ],
                    false
                ],
                "#FFF27B",
                [
                    "case",
                    [
                        "==",
                        ["get", "adjacency"],
                        0
                    ],
                    [
                        "interpolate",
                        ["linear"],
                        ["get", "adjacency"],
                        0.036190871149302,
                        "#ed4426",
                        0.15,
                        "#ed665a",
                        0.25,
                        "#f2a085",
                        0.35,
                        "#f2c194",
                        0.5,
                        "#f8eab4",
                        0.75,
                        "#d3dfaf",
                        1,
                        "#a8bd93",
                        5,
                        "#79b484"
                    ],
                    [
                        "interpolate",
                        ["linear"],
                        ["get", "adjacency"],
                        0.036190871149302,
                        "#ed4426",
                        0.15,
                        "#ed665a",
                        0.25,
                        "#f2a085",
                        0.35,
                        "#f2c194",
                        0.5,
                        "#f8eab4",
                        0.75,
                        "#d3dfaf",
                        1,
                        "#a8bd93",
                        5,
                        "#79b484"
                    ]
                ]
            ],
            'fill-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                13.75,
                0,
                15,
                0.75,
                22,
                0.75
            ],
            'fill-outline-color': 'rgba(0, 0, 0, 0)'
        }
    });
    
    //40187 Buildings Right Fill Layer
    flMap.addLayer({
        id: '40187_BUILDINGS_RIGHT',
        type: 'fill',
        source: '40187_RIGHT_SVIPATH_SERVERSOURCE',
        filter: [
            "!=",
            ["get", "adjacency"],
            0
        ],
        paint: {
            'fill-color': [
                "case",
                [
                    "boolean",
                    [
                        "feature-state",
                        "hover"
                    ],
                    false
                ],
                "#FFF27B",
                [
                    "case",
                    [
                        "==",
                        ["get", "adjacency"],
                        0
                    ],
                    [
                        "interpolate",
                        ["linear"],
                        ["get", "adjacency"],
                        0.036190871149302,
                        "#ed4426",
                        0.15,
                        "#ed665a",
                        0.25,
                        "#f2a085",
                        0.35,
                        "#f2c194",
                        0.5,
                        "#f8eab4",
                        0.75,
                        "#d3dfaf",
                        1,
                        "#a8bd93",
                        5,
                        "#79b484"
                    ],
                    [
                        "interpolate",
                        ["linear"],
                        ["get", "adjacency"],
                        0.036190871149302,
                        "#ed4426",
                        0.15,
                        "#ed665a",
                        0.25,
                        "#f2a085",
                        0.35,
                        "#f2c194",
                        0.5,
                        "#f8eab4",
                        0.75,
                        "#d3dfaf",
                        1,
                        "#a8bd93",
                        5,
                        "#79b484"
                    ]
                ]
            ],
            'fill-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                13.75,
                0,
                15,
                0.75,
                22,
                0.75
            ],
            'fill-outline-color': 'rgba(0, 0, 0, 0)'
        }
    });
    
    // 40187 Buildings Left Boundary Layer
    flMap.addLayer({
        id: '40187_BUILDINGS_BOUNDARY_LEFT',
        type: 'line',
        source: '40187_LEFT_SVIPATH_SERVERSOURCE',
        paint: {
            'line-color': [
                "case",
                [
                    "boolean",
                    [
                        "feature-state",
                        "hover"
                    ],
                    false
                ],
                "#839bfc",
                "#1c7ce9"
            ],
            'line-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                13,
                0,
                16,
                1
            ],
            'line-width': [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                14.5,
                1,
                17,
                2
            ]
        }
    });

    // 40187 Buildings Right Boundary Layer
    flMap.addLayer({
        id: '40187_BUILDINGS_BOUNDARY_RIGHT',
        type: 'line',
        source: '40187_RIGHT_SVIPATH_SERVERSOURCE',
        paint: {
            'line-color': [
                "case",
                [
                    "boolean",
                    [
                        "feature-state",
                        "hover"
                    ],
                    false
                ],
                "#f4a794",
                "#FC5849"
            ],
            'line-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                13,
                0,
                16,
                1
            ],
            'line-width': [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                14.5,
                1,
                17,
                2
            ]
        }
    });

    // 40187 Buildings Index Left Symbol Layer
    flMap.addLayer({
        id: '40187_BUILDINGS_INDEX_LEFT',
        type: 'symbol',
        source: '40187_LEFT_SVIPATH_SERVERSOURCE',
        layout: {
            'text-field': 'L',
            'text-font': [
                "Source Sans Pro Bold",
                "Arial Unicode MS Regular"
            ],
            'text-size': [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                9,
                16,
                11
            ],
            'text-letter-spacing': 0,
            'text-line-height': 1.2,
            'text-max-width': 10,
            'text-justify': 'center',
            'text-anchor': 'center',
            'text-padding': 2,
            'symbol-placement': 'point',
            'symbol-spacing': 250,
            'text-max-angle': 45,
            'text-allow-overlap': false,
            'icon-allow-overlap': false,
            'text-ignore-placement': true,
            'text-pitch-alignment': 'auto',
            'sort-key': [
                "case",
                ["<", ["get", "id"], 900],
                ["interpolate", ["linear"], ["zoom"], 15.5, 0, 16.25, 1],
                ["interpolate", ["linear"], ["zoom"], 16.25, 0, 17, 1]
            ]
        },
        paint: {
            'text-color': '#a6a5a1',
            'text-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                16,
                0,
                16.5,
                1
            ],
            'text-halo-color': '#fafafa',
            'text-halo-width': 1,
            'text-halo-blur': 0,
            'text-occlusion-opacity': 1
        }
    });
    
    // 40187 Buildings Index Right Symbol Layer
    flMap.addLayer({
        id: '40187_BUILDINGS_INDEX_RIGHT',
        type: 'symbol',
        source: '40187_RIGHT_SVIPATH_SERVERSOURCE',
        layout: {
            'text-field': 'R',
            'text-font': [
                "Source Sans Pro Bold",
                "Arial Unicode MS Regular"
            ],
            'text-size': [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                9,
                16,
                11
            ],
            'text-letter-spacing': 0,
            'text-line-height': 1.2,
            'text-max-width': 10,
            'text-justify': 'center',
            'text-anchor': 'center',
            'text-padding': 2,
            'symbol-placement': 'point',
            'symbol-spacing': 250,
            'text-max-angle': 45,
            'text-allow-overlap': false,
            'icon-allow-overlap': false,
            'text-ignore-placement': true,
            'text-pitch-alignment': 'auto',
            'sort-key': [
                "case",
                ["<", ["get", "id"], 900],
                ["interpolate", ["linear"], ["zoom"], 15.5, 0, 16.25, 1],
                ["interpolate", ["linear"], ["zoom"], 16.25, 0, 17, 1]
            ]
        },
        paint: {
            'text-color': '#a6a5a1',
            'text-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                16,
                0,
                16.5,
                1
            ],
            'text-halo-color': '#fafafa',
            'text-halo-width': 1,
            'text-halo-blur': 0,
            'text-occlusion-opacity': 1
        }
    }); 

    // 40187 Adjacency Points Layer
    flMap.addLayer({
        id: '40187_ADJACENCY',
        type: 'circle',
        source: '40187_ADJACENCY_SERVERSOURCE',
        paint: {
            'circle-radius': [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.5,
                1,
                16.35,
                3,
                16.75,
                4
            ],
            'circle-color': "#f05229",
            'circle-opacity': 1,
            'circle-stroke-color': "#fbfaf3",
            'circle-stroke-width': [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.25,
                1.35,
                16,
                1.65
            ]
        }
    });
});

flMap.on('style.load', () => {
    let leftBuildingID = null;
    let rightBuildingID = null;


    flMap.on('mousemove', '40187_BUILDINGS_LEFT', (event) => {
        flMap.getCanvas().style.cursor = 'pointer';

      if (event.features.length === 0) return;

      if (leftBuildingID) {
        flMap.removeFeatureState({
          source: '40187_LEFT_SVIPATH_SERVERSOURCE',
          id: leftBuildingID
        });
      }

      leftBuildingID = event.features[0].id;

      flMap.setFeatureState(
        {
          source: '40187_LEFT_SVIPATH_SERVERSOURCE',
          id: leftBuildingID
        },
        {
          hover: true
        }
      );
    });

    flMap.on('mouseleave', '40187_BUILDINGS_LEFT', () => {
      if (leftBuildingID) {
        flMap.setFeatureState(
          {
            source: '40187_LEFT_SVIPATH_SERVERSOURCE',
            id: leftBuildingID
          },
          {
            hover: false
          }
        );
      }
      leftBuildingID = null;
      flMap.getCanvas().style.cursor = '';
    });

    flMap.on('mousemove', '40187_BUILDINGS_RIGHT', (event) => {
        flMap.getCanvas().style.cursor = 'pointer';
        if (event.features.length === 0) return;
        if (rightBuildingID) {
            flMap.removeFeatureState({
                source: '40187_RIGHT_SVIPATH_SERVERSOURCE',
                id: rightBuildingID
            });
        }
        rightBuildingID = event.features[0].id;
        flMap.setFeatureState(
            {
                source: '40187_RIGHT_SVIPATH_SERVERSOURCE',
                id: rightBuildingID
            },
            {
                hover: true
            }
        );
    });
    
    flMap.on('mouseleave', '40187_BUILDINGS_RIGHT', () => {
        if (rightBuildingID) {
            flMap.setFeatureState(
                {
                    source: '40187_RIGHT_SVIPATH_SERVERSOURCE',
                    id: rightBuildingID
                },
                {
                    hover: false
                }
            );
        }
        rightBuildingID = null;
        flMap.getCanvas().style.cursor = '';
    });

    flMap.on('click', '40187_BUILDINGS_LEFT', () => {
        if (leftBuildingID) {
            flMap.setFeatureState(
                {
                    source: '40187_LEFT_SVIPATH_SERVERSOURCE',
                    id: leftBuildingID
                },
                {
                    hover: false
                }
            );
        }
        leftBuildingID = null;
        flMap.getCanvas().style.cursor = '';
    });

    flMap.on('click', '40187_BUILDINGS_LEFT', (event) => showPopup(event, '40187_BUILDINGS_SVIPATH_SERVERSOURCE'));
    flMap.on('click', '40187_BUILDINGS_RIGHT', (event) => showPopup(event, '40187_BUILDINGS_SVIPATH_SERVERSOURCE'));



    function handleBuildingClick(event) {
        if (event.features.length === 0) return;
    
        const feature = event.features[0];
        const rawLon = feature.properties['nearest_x'];
        const rawLat = feature.properties['nearest_y'];
        
        const currentLon = parseFloat(rawLon);
        const currentLat = parseFloat(rawLat);
    
        const preClickZoomLevel = flMap.getZoom();
        const currentZoom = Math.max(preClickZoomLevel, 18);
    
        console.log(`Longitude: ${currentLon.toFixed(4)}, Latitude: ${currentLat.toFixed(4)}, Zoom: ${currentZoom}`);
    
        flMap.flyTo({
            center: [currentLon, currentLat],
            zoom: currentZoom
        });
    }
    
    flMap.on('click', '40187_BUILDINGS_LEFT', handleBuildingClick);
    flMap.on('click', '40187_BUILDINGS_RIGHT', handleBuildingClick);
});

// Attach the handleClick function to both LEFT and RIGHT layers
function filterFeatures(searchTerm) {
    const rightLayerName = '40187_BUILDINGS_RIGHT';
    const leftLayerName = '40187_BUILDINGS_LEFT';

    // Clear all hover states first
    flMap.queryRenderedFeatures({
        layers: [rightLayerName, leftLayerName]
    }).forEach(feature => {
        flMap.setFeatureState(
            {
                source: feature.source,
                index: feature.index
            },
            {
                hover: false
            }
        );
    });

    // Query and set hover state for RIGHT layer based on indexR
    flMap.queryRenderedFeatures({
        layers: [rightLayerName]
    }).forEach(feature => {
        const match = feature.properties.indexL && feature.properties.indexL.toString().toLowerCase().includes(searchTerm.toLowerCase());
        flMap.setFeatureState(
            {
                source: feature.source,
                id: feature.id
            },
            {
                hover: match
            }
        );
    });

    // Query and set hover state for LEFT layer based on index
    flMap.queryRenderedFeatures({
        layers: [leftLayerName]
    }).forEach(feature => {
        const match = feature.properties.index && feature.properties.index.toString().toLowerCase().includes(searchTerm.toLowerCase());
        flMap.setFeatureState(
            {
                source: feature.source,
                id: feature.id
            },
            {
                hover: match
            }
        );
    });
}

// Event listener for search input
document.getElementById('interactive-map-search-input').addEventListener('input', debounce((event) => {
    const searchTerm = event.target.value;
    filterFeatures(searchTerm);
}, 300));

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to handle clearing search results
function clearSearchResults() {
    const rightLayerName = '40187_BUILDINGS_RIGHT';
    const leftLayerName = '40187_BUILDINGS_LEFT';

    flMap.queryRenderedFeatures({
        layers: [rightLayerName, leftLayerName]
    }).forEach(feature => {
        flMap.setFeatureState(
            {
                source: feature.source,
                id: feature.id
            },
            {
                hover: false
            }
        );
    });
}

// Clear search results on focus out
document.getElementById('interactive-map-search-input').addEventListener('focusout', () => {
    clearSearchResults();
});

const secondsPerRevolution = -120;
const maxSpinZoom = 5;
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
        map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
}

map.on('moveend', () => {
    spinGlobe();
});