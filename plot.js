let colorScale;
let activeElement = null;
let activeElementId = null;
const plotContainer = document.getElementById('plot01');
let plotWidth = plotContainer.offsetWidth;
let plotHeight = plotContainer.offsetHeight;
let currentDataType = 'population';
let topojsonData;

const projection = d3.geoMercator()
  .scale(1)
  .translate([plotWidth / 2, plotHeight + 100 / 2]);

const geoGenerator = d3.geoPath().projection(projection);

const dataTypes = {
  population: d => d.properties.population,
  death_toll: d => Math.abs(d.properties.death_toll / d.properties.population),
  shelter: d => Math.abs(d.properties.shelter / d.properties.population),
  dmg_pop: d => Math.abs(d.properties.medium_dam / d.properties.population),
};

const colorScales = {
  population: d3.scaleSequential(d3.interpolateGnBu).domain([0, 1]),
  death_toll: d3.scaleSequential(d3.interpolateMagma).domain([0, 1]),
  shelter: d3.scaleSequential(d3.interpolateGreens),
  dmg_pop: d3.scaleSequential(d3.schemeYlOrRd[8,9]),
}

function handleMouseover(d, event) {
  if (d.properties && d.properties.name) {
    const name = d.properties.name;
    const sentenceCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const bounds = geoGenerator.bounds(d);
    const centroid = geoGenerator.centroid(d);

    d3.select('#plot .info')
      .text(`${sentenceCaseName} Mahallesi`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY + 10) + 'px');

    d3.select('#plot .bounding-box rect')
      .attr('x', bounds[0][0])
      .attr('y', bounds[0][1])
      .attr('width', bounds[1][0] - bounds[0][0])
      .attr('height', bounds[1][1] - bounds[0][1]);

    d3.select('#plot .centroid')
      .style('display', 'inline')
      .attr('transform', 'translate(' + centroid + ')');

    d3.select(this).classed('onHover', true)
      .transition()
      .duration(50)
      .style('stroke', "#232323");

    if (!d3.select(this).classed('active')) {
      d3.select(this).raise();
    }

    if (activeElement) {
      d3.select(activeElement).raise();
    }
  } else {
    
  }
}

function handleMouseout(d, event) {
  d3.select('#plot .bounding-box rect').attr('width', 0).attr('height', 0);
  d3.select('#plot .centroid').style('display', 'none');

  if (!d3.select(this).classed('active')) {
    d3.select(this).classed('onHover', false)
      .transition()
      .duration(1)
      .style('stroke', "#fff");
  } else {
    d3.select('#plot .info')
    .text(`${activeElementId}`)
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY + 10) + 'px');
  }
}

function handleClick(d, event) {
  const bbox = this.getBoundingClientRect();
  const popupx = event.pageX || bbox.x;
  const popupy = event.pageY || bbox.y;

  if (d.properties && d.properties.name) {
    d3.selectAll('#plot g.map path')
      .classed('active', false)
      .classed('inactive', true)
      .transition()
      .duration(300)
      .style('stroke', "#fff")
      .style('stroke-width', "0.7px");
    d3.select(this)
      .classed('active', true)
      .classed('inactive', false)
      .transition()
      .duration(300)
      .style('stroke', "#232323")
      .style('stroke-width', "2px");

    activeElement = this;
    d3.select(activeElement).raise();
    const bounds = geoGenerator.bounds(d);
    const centroid = geoGenerator.centroid(d);
    const name = d.properties.name;
    const sentenceCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const population = d.properties.population;
    const deathToll = Math.abs(d.properties.death_toll);
    const severely_injured = Math.abs(d.properties.severely_in);
    const needs_hospitalization = Math.abs(d.properties.needs_hosp);
    const shelter = Math.abs(d.properties.shelter);
    const low_damage = Math.abs(d.properties.low_damage);
    const medium_damage = Math.abs(d.properties.medium_dam);
    const heavy_damage = Math.abs(d.properties.heavy_dama);
    const extremely_heavy_damage = Math.abs(d.properties.extremely_);
    const natural_gas = Math.abs(d.properties.natural_ga);
    const drinking_water = Math.abs(d.properties.drinking_w);
    const sewage_pipe = Math.abs(d.properties.sewage_pip);

    d3.select('#plot .info')
      .text(`${sentenceCaseName}`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY + 10) + 'px');

    d3.select('#popup')
      .html(`
          <div class="close-btn" onclick="hidePopup()"><svg width="12" height="12" style="margin-bottom:-3px; margin-right:3px;" viewBox="0 0 59 59" fill="#c8c8c8" xmlns="http://www.w3.org/2000/svg"><path d="M51.3636 58.7273L0.09091 7.45454L7 0.545456L58.2727 51.8182L51.3636 58.7273ZM7 58.7273L0.09091 51.8182L51.3636 0.545456L58.2727 7.45454L7 58.7273Z"/></svg></div>
          <h3 style="text-align:left; margin-bottom:-0.75em;"><span style="text-align: left; margin-top: 0.35em; text-transform: capitalize; line-height: 2em;">${sentenceCaseName}</span><span style="color:#ccc; margin-left: 0.5em; font-size: 0.75em">Mh</span></h3><hr class="pop-line">
          <div class="ppu-line"><p class="ppu">Population:</p><p class="ppu">${population.toLocaleString()}</p></div>
          <div class="ppu-line"><p class="ppu">Available Shelters:</p><p class="ppu">${shelter.toLocaleString()}</p></div>
          <div class="ppu-line"><p class="ppu">Death Toll:</p><p class="ppu">${deathToll}</p></div>
          <div class="ppu-line"><p class="ppu">Death Toll:</p><p class="ppu">${severely_injured}</p></div>
          <div class="ppu-line"><p class="ppu">Death Toll:</p><p class="ppu">${needs_hospitalization}</p></div><br/>
          <h3 style="text-align: left; margin-top: 0.35em; text-transform: none; line-height: 0.75em"># of Damaged Buildings</h3><hr class="pop-line">
          <div class="ppu-line"><p class="ppu">Low Damage:</p><p class="ppu">${low_damage}</p></div>
          <div class="ppu-line"><p class="ppu">Medium Damage:</p><p class="ppu">${medium_damage}</p></div>
          <div class="ppu-line"><p class="ppu">Heavy Damage:</p><p class="ppu">${heavy_damage}</p></div>
          <div class="ppu-line"><p class="ppu">Extremely Heavy Damage:</p><p class="ppu">${extremely_heavy_damage}</p></div><br/>
          <h3 style="text-align: left; margin-top: 0.35em; text-transform: none; line-height: 0.75em">Infrastructural Damage</h3><hr class="pop-line">
          <div class="ppu-line"><p class="ppu">Natural Gas Lines:</p><p class="ppu">${natural_gas}</p></div>
          <div class="ppu-line"><p class="ppu">Drinking Water Lines:</p><p class="ppu">${drinking_water}</p></div>
          <div class="ppu-line"><p class="ppu">Sewage Pipes:</p><p class="ppu">${sewage_pipe}</p></div>
      `)
      .style('display', 'block')
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY + 10}px`);

    console.log('Popup position:', {
      left: `${event.pageX + 10}px`,
      top: `${event.pageY + 10}px`
    });

    activeElementId = d.properties.name.charAt(0).toUpperCase() + d.properties.name.slice(1).toLowerCase();

    if (event.stopPropagation) {
      event.stopPropagation();
    } 
  }
  return activeElement;
}

function hidePopup() {
  d3.select('#popup').style('display', 'none');
}

d3.select('body').on('click', function(event) {
  if (!event.target.closest('#popup') && !event.target.closest('path')) {
    hidePopup();
  }
});
function switchData(dataType) {
  if (!dataTypes[dataType]) {
    console.error(`Error: ${dataType} is not a valid data type.`);
    return;
  }

  if (dataType === 'death_toll') {
    colorScale = colorScales[dataType];
    const maxRatio = d3.max(topojsonData.objects.tracts.geometries, d => 
      Math.abs(d.properties.death_toll / d.properties.population)
    );
    colorScale.domain([0, maxRatio, dataTypes[dataType]]);
  } else if (dataType === 'dmg_pop') {
    colorScale = colorScales[dataType];
    const maxRatio = d3.max(topojsonData.objects.tracts.geometries, d => 
      Math.abs(d.properties.medium_dam / d.properties.population)
    );
  } else {
    colorScale = colorScales[dataType];
    colorScale.domain([0, d3.max(topojsonData.objects.tracts.geometries, dataTypes[dataType])]);
  }

  const paths = d3.selectAll('#plot g.map path');

  paths.transition()
    .duration(250)
    .attr('fill', d => colorScale(dataTypes[dataType](d)))
    .on('end', function() {
      paths.on('mouseover', function(d) {
               const event = d3.event;
               handleMouseover.call(this, d, event);
             })
           .on('mouseout', function(d) {
               const event = d3.event;
               handleMouseout.call(this, d, event);
             })
           .on('click', function(d) {
             const event = d3.event;

             handleClick.call(this, d, event); 
             if (event.stopPropagation) {
               event.stopPropagation();
             } else {
             }
           });
    });
}

function updateMap(topojsonData, dataType = 'population') {
  console.log('Entered updateMap');
  console.log('DataType:', dataType);

  const objectName = Object.keys(topojsonData.objects)[0];
  const geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);

  const paths = d3.select('#plot g.map').selectAll('path').data(geojson.features);

  paths.enter()
    .append('path')
    .attr('d', geoGenerator)
    .attr('fill', d => colorScale(dataTypes[dataType](d)))
    .on('mouseover', function(event, d) {
      handleMouseover.call(this, event, d);
    })
    .on('mouseout', function(event, d) {
      handleMouseout.call(this, event, d);
    })
    .on('click', function(event, d) {
      handleClick.call(this, event, d);
      if (event.stopPropagation) {
        event.stopPropagation();
      }
    });

  paths.attr('d', geoGenerator)
    .attr('fill', d => colorScale(dataTypes[dataType](d)))
    .on('mouseover', function(event, d) {
      handleMouseover.call(this, event, d);
    })
    .on('mouseout', function(event, d) {
      handleMouseout.call(this, event, d);
    })
    .on('click', function(event, d) {
      handleClick.call(this, event, d);
      if (event.stopPropagation) {
        event.stopPropagation();
      }
    });

  paths.exit().remove();

  const mergedGeometry = topojson.merge(topojsonData, topojsonData.objects[objectName].geometries);
  const mergedFeature = { type: "Feature", geometry: mergedGeometry };

  const boundaryPath = d3.select('#plot g.boundary').selectAll('path').data([mergedFeature]);

  boundaryPath.enter()
    .append('path')
    .attr('d', geoGenerator);

  boundaryPath.attr('d', geoGenerator);

  boundaryPath.exit().remove();

  console.log('Exiting updateMap');
}

d3.selection.prototype.raise = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

function updateProjectionAndPath(topojsonData) {
  const objectName = Object.keys(topojsonData.objects)[0];
  const geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);

  const padding = 20;
  projection.fitExtent([[padding, padding], [plotWidth - padding, plotHeight - padding]], geojson);
  geoGenerator.projection(projection);
}

function update(topojsonData) {
  console.log('Entered update');
  
  plotWidth = plotContainer.offsetWidth;
  plotHeight = plotContainer.offsetHeight;

  updateProjectionAndPath(topojsonData);
  updateMap(topojsonData, currentDataType);

  colorScale = colorScales[currentDataType];
  if (currentDataType === 'death_toll') {
    const maxRatio = d3.max(topojsonData.objects.tracts.geometries, d => 
      Math.abs(d.properties.death_toll / d.properties.population)
    );
    colorScale.domain([0, maxRatio]);
  } else {
    colorScale.domain([0, d3.max(topojsonData.objects.tracts.geometries, dataTypes[currentDataType])]);
  }

  const paths = d3.selectAll('#plot g.map path');

  paths.attr('fill', d => colorScale(dataTypes[currentDataType](d)))
    .on('mouseover', function(event, d) {
      handleMouseover.call(this, event, d);
    })
    .on('mouseout', function(event, d) {
      handleMouseout.call(this, event, d);
    })
    .on('click', function(event, d) {
      handleClick.call(this, event, d);
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
      }
    });
}

function resize() {
  plotWidth = plotContainer.offsetWidth;
  plotHeight = plotContainer.offsetHeight;

  d3.select('#plot g.map').selectAll('path').remove();
  d3.select('#plot g.boundary').selectAll('path').remove();
  
  update(topojsonData);
}

function loadTopojsonData(url) {
  d3.json(url)
    .then(function(json) {
      topojsonData = json;

      colorScale = colorScales['population']
        .domain([0, d3.max(topojsonData.objects.tracts.geometries, dataTypes['population'])]);
      
      update(json);

      console.log('TopoJSON data loaded:', json);

      window.addEventListener('resize', resize);
    })
    .catch(function(error) {
      console.log('Error loading TopoJSON data:', error);
    });
}

loadTopojsonData('https://raw.githubusercontent.com/tahaerdem/flWebmap/main/plot/L3.json');