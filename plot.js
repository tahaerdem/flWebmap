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
  death_toll: d => d.properties.death_toll,
  shelter: d => d.properties.shelter,
};

const colorScales = {
  population: d3.scaleSequential(d3.interpolateBlues),
  death_toll: d3.scaleSequential(d3.interpolateGreens),
  shelter: d3.scaleSequential(d3.interpolateReds),
};

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
  console.log(activeElementId);
  d3.select('#plot .bounding-box rect').attr('width', 0).attr('height', 0);
  d3.select('#plot .centroid').style('display', 'none');

  if (!d3.select(this).classed('active')) {
    d3.select(this).classed('onHover', false)
      .transition()
      .duration(1)
      .style('stroke', "#fff");
  } else {
    d3.select('#plot .info')
    .text(`${activeElementId.properties.name}`)
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY + 10) + 'px');
  }
}

function handleClick(d, event) {
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
    const death_toll = d.properties.death_toll;
    const shelter = d.properties.shelter;

    d3.select('#plot .info')
      .text(`${sentenceCaseName}`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY + 10) + 'px');

    d3.select('#popup')
      .html(`
          <div class="close-btn" onclick="hidePopup()">x</div>
          <h3 style="text-align: left; margin-top: 0.35em; text-transform: capitalize; line-height: 1em">${sentenceCaseName}</h3><hr class="pop-line">
          <div class="ppu-line"><p class="ppu">Population:</p><p class="ppu">${population.toLocaleString()}</p></div>
          <div class="ppu-line"><p class="ppu">Shelter:</p><p class="ppu">${shelter.toLocaleString()}</p></div>
          <div class="ppu-line"><p class="ppu">Death Toll:</p><p class="ppu">${death_toll.toLocaleString()}</p></div>
      `)
      .style('display', 'block')
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY + 10}px`);

      activeElementId = d.properties.namecharAt(0).toUpperCase() + d.properties.slice(1).toLowerCase();

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

  currentDataType = dataType;
  colorScale = colorScales[dataType];
  colorScale.domain([0, d3.max(topojsonData.objects.tracts.geometries, dataTypes[dataType])]);

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
    .on('mouseover', function(d) {
      const event = d3.event;
      console.error('mouseover event:', event);
      console.error('mouseover data:', d);
      handleMouseover.call(this, d, event);
    })
    .on('mouseout', function(d) {
      const event = d3.event;
      console.error('mouseout event:', event);
      console.error('mouseout data:', d);
      handleMouseout.call(this, d, event);
    })
    .on('click', function(d) {
      const event = d3.event;
      console.error('click event:', event);
      console.error('click data:', d);
      handleClick.call(this, d, event); 
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        console.error('stopPropagation is not a function on event:', event);
      }
    });

  // Update selection: existing elements
  paths.attr('d', geoGenerator)
    .attr('fill', d => colorScale(dataTypes[dataType](d)))
    .on('mouseover', function(d) {
      const event = d3.event;
      console.error('mouseover event:', event);
      console.error('mouseover data:', d);
      handleMouseover.call(this, event, d);
    })
    .on('mouseout', function(d) {
      const event = d3.event;
      console.error('mouseout event:', event);
      console.error('mouseout data:', d);
      handleMouseout.call(this, event, d);
    })
    .on('click', function(d) {
      const event = d3.event;
      console.error('click event:', event);
      console.error('click data:', d);
      handleClick.call(this, event, d); // Correct order: event first, then data
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        console.error('stopPropagation is not a function on event:', event);
      }
    });

  // Exit selection: remove old elements
  paths.exit().remove();

  // Boundary update
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
  colorScale.domain([0, d3.max(topojsonData.objects.tracts.geometries, dataTypes[currentDataType])]);

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

      console.warning('TopoJSON data loaded:', json);

      window.addEventListener('resize', resize);
    })
    .catch(function(error) {
      console.warning('Error loading TopoJSON data:', error);
    });
}

loadTopojsonData('https://raw.githubusercontent.com/tahaerdem/flWebmap/main/plot/L3.json');