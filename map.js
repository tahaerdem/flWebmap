
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

function getScrollPositionY() {
    return window.scrollY || document.documentElement.scrollTop;
}

// Event listener to handle scroll events
window.addEventListener('scroll', function() {
    var scrollTop = getScrollPositionY();
//    console.log('Scroll position:', scrollTop);
    return scrollTop;
});

window.addEventListener('resize', () => {
    istMap.resize(); // Ensure the map resizes
    fitMapToBounds(); // Fit the map to the bounds
    //ScrollTrigger.refresh();
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
                    const targetZoom = 5;
    
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
                        console.log('F03:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (f02Lng - center.lng) / 100;
                        latStep = (f02Lat - center.lat) / 100;
                        zoomStep = (f02Zoom - map.getZoom()) / 50;
                        console.log('F03:', velocity);
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

    function frame04() {
        const layersToToggle = [];
        const layersToToggleWhenLeft = ['feb6-eq-circle-stroke-end', 'feb6-eq-circle-stroke-end-t'];
        const earthquakeLayer = 'feb6-eq-circle-stroke';
        const sourceLayer = 'usgs-feb67-eq-data-0ezrpr';
        const startTime = 1675646254342;
        const endTime = 1675679088811;
      
        const dateDisplay = document.createElement('h3');
        dateDisplay.style.position = 'fixed';
        dateDisplay.id = 'date-time-scroll-counter';
        dateDisplay.style.top = '20px';
        dateDisplay.style.right = '20px';
        dateDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        dateDisplay.style.padding = '10px';
        dateDisplay.style.borderRadius = '5px';
        dateDisplay.style.zIndex = '9999';
        document.body.appendChild(dateDisplay);
      
        map.on('idle', () => {
          const features = map.querySourceFeatures('composite', {
            sourceLayer: sourceLayer,
          }).sort((a, b) => a.properties.time - b.properties.time)
            .filter(f => f.properties.time >= startTime && f.properties.time <= endTime);
      
          if (features.length === 0) {
            console.error('No earthquake features found in the specified time range');
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
      
              onRefresh: self => {
                const pinnedElement = self.pin;
                const windowWidth = window.innerWidth || document.documentElement.clientWidth;
                const elementWidth = pinnedElement.offsetWidth;
                const left = (windowWidth - elementWidth) / 2;
                pinnedElement.style.left = `${left}px`;
              },
      
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
      
                const date = new Date(currentDate + (8 * 60 * 60 * 1000));
                const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
                const formattedDate = date.toLocaleString('en-US', options);
                dateDisplay.textContent = `${formattedDate}`;
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

    //Zoom into second EQ
    function frame05() {
        const layersToToggle = ['feb6-eq-circle-stroke-end', 'feb6-eq-circle-stroke-end-t'];
        const layersToHide = [];
        const dateDisplay = document.getElementById('date-time-scroll-counter');
        
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#TL03",
                start: '50% top', //Make it stop near the top, if wanna center it do 'top top'
                end: '600% top',
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
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "visible";
                },

                onEnterBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "visible";
                },

                onLeaveBack: () => {
                    layersToToggle.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'visible');
                    });
                    layersToHide.forEach(layerId => {
                        map.setLayoutProperty(layerId, 'visibility', 'none');
                    });
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "visible";
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
                        console.log('F05:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 20;
                        latStep = (targetLat - center.lat) / 20;
                        zoomStep = (7.5 - map.getZoom()) / 15;
                        console.log('F05', velocity);
                    } else if (progress > 0.75 && velocity > 0) {
                        dateDisplay.style.opacity = "0";
                    } else if (progress < 0.75 && velocity < 0) {
                        dateDisplay.style.opacity = "1";
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
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "none";
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
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "none";
                },
                onEnterBack: () => {
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "none";
                },
                onLeaveBack: () => {
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "visible";
                },
    
                onUpdate: self => {
                    const title = document.getElementById('fs00Title');
                    const container = document.getElementById('FS00');
                    const windowWidth = window.innerWidth;
                    const margin = document.getElementById('chp01');
                    const initialContainerHeight = 300;
                    const progress = self.progress;
                    const titleWidth = title.getBoundingClientRect().width;

                    let newFontSize = 7 - (progress * 18);
                    let newMarginSize = 50 - (progress * 500);
                    let newContSize = initialContainerHeight - (progress * 850);

                    if (titleWidth < 601) {
                        const currentFontSize = title.style.fontSize;
                        newFontSize = currentFontSize;
                    }

                    if (newFontSize < 2.45) {
                        newFontSize = 2.45;
                    }
    
                    if (newContSize < 150) {
                        newContSize = 150;
                    }

                    if (newMarginSize < 10) {
                        newMarginSize = 10;
                    }
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                    let counter = document.getElementById('date-time-scroll-counter');
                    counter.style.display = "none";
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
        const layersToToggle = ['Fault-Paths-L02-NAF', 'ISO-land'];
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

    //North Anatolia Timeline
    function frame09() {
        const earthquakeLayers = [
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
            '1999-T',
        ];

        const sourceLayers = [
            'major-earthquakes-on-NAF-8y0uiu',
            'gem_active_faults_harmonized-9xzarf'
        ];
    
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

                onUpdate: self => {
                    const progress = self.progress;
                    const totalLayers = earthquakeLayers.length;
                    const step = 1 / totalLayers;
                    const currentStep = Math.floor(progress / step);
    
                    // Show the current earthquake layer based on the scroll progress
                    earthquakeLayers.forEach((layerId, index) => {
                        if (index <= currentStep) {
                            map.setLayoutProperty(layerId, 'visibility', 'visible');
                        } else {
                            map.setLayoutProperty(layerId, 'visibility', 'none');
                        }
                    });
    
                    // Calculate the target position for the map
                    let targetLat, targetLng, targetZoom;
                    if (currentStep < totalLayers) {
                        const layer = earthquakeLayers[currentStep];
                        let coordinates = null;
                        
                        // Query each source layer until features are found
                        for (const sourceLayer of sourceLayers) {
                            const features = map.querySourceFeatures('composite', {
                                sourceLayer: sourceLayer,
                                filter: ['==', 'name', layer]
                            });
    
                            if (features.length > 0) {
                                coordinates = features[0].geometry.coordinates[0];
                                break; // Stop searching once features are found
                            }
                        }
    
                        if (coordinates) {
                            targetLat = coordinates[1];
                            targetLng = coordinates[0];
                            targetZoom = 6 + (10 - 6) * (progress % step) / step; // Interpolate zoom
                            console.log(`Layer ${layer} coordinates:`, coordinates);
                        } else {
                            console.log(`No features found for layer ${layer}`);
                        }
                    } else {
                        const layer = earthquakeLayers[totalLayers - 1];
                        let coordinates = null;
    
                        // Query each source layer until features are found
                        for (const sourceLayer of sourceLayers) {
                            const features = map.querySourceFeatures('composite', {
                                sourceLayer: sourceLayer,
                                filter: ['==', 'name', layer]
                            });
    
                            if (features.length > 0) {
                                coordinates = features[0].geometry.coordinates[0];
                                break; // Stop searching once features are found
                            }
                        }
    
                        if (coordinates) {
                            targetLat = coordinates[1];
                            targetLng = coordinates[0];
                            targetZoom = 10;
                            console.log(`Layer ${layer} coordinates:`, coordinates);
                        } else {
                            console.log(`No features found for layer ${layer}`);
                        }
                    }
    
                    const center = map.getCenter();
                    const lngStep = (targetLng - center.lng) / 20;
                    const latStep = (targetLat - center.lat) / 20;
                    const zoomStep = (targetZoom - map.getZoom()) / 15;
    
                    map.easeTo({
                        center: [center.lng + lngStep, center.lat + latStep],
                        zoom: map.getZoom() + zoomStep,
                        duration: 0, // Keep duration 0 for smooth continuous movement
                        easing: t => t // linear easing
                    });
                },
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
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
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

    // Istanbul
    function frame12() {
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
                },

                onUpdate: self => {
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
                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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
                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
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
                        console.log('F12-3:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
                        console.log('F12-3', velocity);
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
                        console.log('F12-3:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
                        console.log('F12-3', velocity);
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
                        console.log('F12-3:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
                        console.log('F12-3', velocity);
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
                        console.log('F12-3:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
                        console.log('F12-3', velocity);
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
                        console.log('F12-3:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (9 - map.getZoom()) / 15;
                        console.log('F12-3', velocity);
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
        const layersToHide = ['settlement-minor-lab','country-label','Turkey-L01','Fault-Paths-L01','Fault-Paths-L03','1939','1939-T','1939-P','1942','1942-T','1942-P','1943','1943-T','1944','1944-T','1944-P','1957','1957-T','1957-P','1967','1967-T','1967-P','1999','1999-T','hillshade'];
        
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS08",
                start: 'top top', // Make it stop near the top, if wanna center it do 'top top'
                end: '5000% top',
                pin: true,
                scrub: true,
                markers: false,

                onRefresh: self => {
                    const pinnedElement = self.pin;
                    pinnedElement.style.width = '100%';
                    pinnedElement.style.maxWidth = '100%';
                },

                onEnter: () => {
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
                onEnterBack: () => {
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
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.158;
                    const targetLng = 28.978;
                    const targetZoom = 8.75;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F13:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8.75 - map.getZoom()) / 15;
                        console.log('F13', velocity);
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
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS0911",
                start: 'top top',
                end: '1000% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    const title = document.getElementById('fs00911Title');
                    const container = document.getElementById('FS0911');
                    const margin = document.getElementById('chp05');
                    
                    const initialContainerHeight = 300;
                    const progress = self.progress;

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
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    //Artificial Intelligence intro
    function frame141() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS092",
                start: 'top top',
                end: '400% 32%',
                pin: true,
                scrub: true,
                markers: false,
    
                onEnter: () => {},
                onEnterBack: () => {},
                onLeaveBack: () => {},
    
                onUpdate: self => {
                    const title = document.getElementById('fs0092Title');
                    const container = document.getElementById('FS092');
                    const margin = document.getElementById('chp06');
                    
                    const initialContainerHeight = 300;
                    const progress = self.progress;

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
    
                    title.style.fontSize = `${newFontSize}vw`;
                    container.style.height = `${newContSize}px`;
                    margin.style.marginTop = `${newMarginSize}px`;
                },
    
                onLeave: () => {
                },
            },
        });
    }

    //Artificial Intelligence
    function frame14() {

        const layersToToggle = ['L3_Population', 'ISO-water','L3_AdminBoundaries','L2_AdminBoundaries'];
        const layersToHide = ['L3_Shelter'];

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS10",
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
                end: '1250% top',
                pin: true,
                scrub: true,
                markers: false,

                onRefresh: self => {
                    const pinnedElement = self.pin;
                    pinnedElement.style.width = '100%';
                    pinnedElement.style.maxWidth = '100%';
                },

                onEnter: () => {
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
                    const targetLat = 41.158;
                    const targetLng = 28.978;
                    const targetZoom = 8.75;

                    let lngStep, latStep, zoomStep;

                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (targetZoom - map.getZoom()) / 20;
                        console.log('F13:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8.75 - map.getZoom()) / 15;
                        console.log('F13', velocity);
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
                    const title = document.getElementById('fs00112Title');
                    const container = document.getElementById('FS00112');
                    const margin = document.getElementById('chp07');
                    
                    const initialContainerHeight = 252;
                    const progress = self.progress;

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

                    title.style.fontSize = `${newFontSize}vw`;
                    margin.style.marginTop = `${newMarginSize}px`;
                    container.style.height = `${newContSize}px`;

                },
    
                onLeave: () => {
                },
            },
        });
    }

    function frame15() {
        const tabtitle = document.getElementById('tab-title');
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#FS12",
                start: 'top top', //Make it stop near the top, if wanna center it do 'top top'
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
                    const progress = self.progress;
                    const velocity = self.getVelocity();
                    const center = map.getCenter();
                    const targetLat = 41.158;
                    const targetLng = 28.978;
                    const targetZoom = 8.75;
                    tabtitle.style.color = '#fff';
                    tabtitle.style.opacity = (progress * progress) * 50;
    
                    let lngStep, latStep, zoomStep;
    
                    if (velocity > 0 && window.scrollY > 0) {
                        // Forward animation steps
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;

                        console.log('F10:', velocity);
                    } else if (velocity < 0 && window.scrollY > 0) {
                        lngStep = (targetLng - center.lng) / 30;
                        latStep = (targetLat - center.lat) / 30;
                        zoomStep = (8.75 - map.getZoom()) / 15;
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
    .add(frame14(), { onLeave: frame141 })
    .add(frame151(), { onLeave: frame14 })
    .add(frame15(), { onLeave: frame151 })

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
        map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
}

map.on('moveend', () => {
    spinGlobe();
});

const istMap = new mapboxgl.Map({
    container: 'ist-map',
    style: 'mapbox://styles/tahaerdemozturk/clwt6u2xg05k601nx3zbs1cun/draft',
    zoom: 8,
    center: [28.997,41.198],
    scrollZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    touchZoomRotate: false,
    touchPitchHandler: false,
    attributionControl: false,
});

istMap.on('style.load', () => {
    const layersToToggle = ['L3_AdminBoundaries','L2_AdminBoundaries','L3_Population','ISO-land'];
    layersToToggle.forEach(layerId => {
        istMap.setLayoutProperty(layerId, 'visibility', 'visible');
    });
});

function fitMapToBounds() {
    const istbounds = [
        [27.82,40.64], // Istanbul Southwest coordinates
        [30.44,41.65]  // Istanbul Northeast coordinates
    ];

    istMap.fitBounds(istbounds, {
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        animate: false
    });
    istMap.jumpTo({
        center: [28.997,41.198],
    });       
}

fitMapToBounds();


