var plotContainer = document.getElementById('plot01');
let plotWidth = plotContainer.offsetWidth;
var plotHeight = plotContainer.offsetHeight;

let projection = d3.geoMercator()
  .scale(1)
  .translate([plotWidth / 2, plotHeight + 100 / 2]);

let geoGenerator = d3.geoPath()
  .projection(projection);

let colorScale;
var activeElement = null;

const dataTypes = {
  population: d => d.properties.population,
  area: d => d.properties.area,
  income: d => d.properties.income,
};

const colorScales = {
  population: d3.scaleSequential(d3.interpolateBlues),
  area: d3.scaleSequential(d3.interpolateGreens),
  income: d3.scaleSequential(d3.interpolateReds),
};

function switchData(dataType) {
  // Update the color scale based on the selected data type
  colorScale.domain([0, d3.max(topojsonData.objects.ist.geometries, dataTypes[dataType])]);

  // Update the map with the new data type
  d3.selectAll('#plot g.map path')
    .transition()
    .duration(1000)
    .attr('fill', d => colorScale(dataTypes[dataType](d)));

  // Update the information in the pop-up when hovering
  handleMouseover = function(d, e) {
    if (d.properties && d.properties.name) {
      let name = d.properties.name;
      let sentenceCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      let pixelArea = geoGenerator.area(d);
      let bounds = geoGenerator.bounds(d);
      let centroid = geoGenerator.centroid(d);
      let measure = geoGenerator.measure(d);
      let value = dataTypes[dataType](d);
      
      d3.select('#plot .info')
        .text(`${sentenceCaseName} (${dataType.charAt(0).toUpperCase() + dataType.slice(1)}: ${value.toLocaleString()}) (Area: ${pixelArea.toFixed(1)} Border: ${measure.toFixed(1)})`)
        .style('left', (e.pageX + 10) + 'px')
        .style('top', (e.pageY + 10) + 'px');
  
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
        .duration(500)
        .style('stroke', "#232323");
      
      if (!d3.select(this).classed('active')) {
        d3.select(this).raise(); // Raise hovered element only if it's not active
      }
  
      if (activeElement) {
        d3.select(activeElement).raise();
      }
    }
  };
}

function handleMouseover(d, e) {
  if (d.properties && d.properties.name) {
    let name = d.properties.name;
    let sentenceCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    let pixelArea = geoGenerator.area(d);
    let bounds = geoGenerator.bounds(d);
    let centroid = geoGenerator.centroid(d);
    let measure = geoGenerator.measure(d);
    let population = d.properties.population;
    
    d3.select('#plot .info')
      .text(`${sentenceCaseName} (Population: ${population.toLocaleString()}) (Area: ${pixelArea.toFixed(1)} Border: ${measure.toFixed(1)})`)
      .style('left', (e.pageX + 10) + 'px')
      .style('top', (e.pageY + 10) + 'px');

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
      .duration(500)
      .style('stroke', "#232323");
    
    if (!d3.select(this).classed('active')) {
      d3.select(this).raise(); // Raise hovered element only if it's not active
    }

    if (activeElement) {
      d3.select(activeElement).raise();
    }
  }
}

function handleMouseout() {
  d3.select('#plot .info').text('');
  d3.select('#plot .bounding-box rect').attr('width', 0).attr('height', 0);
  d3.select('#plot .centroid').style('display', 'none');

  if (!d3.select(this).classed('active')) {
    d3.select(this).classed('onHover', false)
      .transition()
      .duration(500)
      .style('stroke', "#fff");
  }
}

function handleClick(d, event) {
  try {
    if (d.properties && d.properties.name) {
      d3.selectAll('#plot g.map path')
        .classed('active', false)
        .classed('inactive', true)
        .transition()
        .duration(500)
        .style('stroke', "#fff")
        .style('stroke-width', "1px");

      d3.select(this)
        .classed('active', true)
        .classed('inactive', false)
        .transition()
        .duration(500)
        .style('stroke', "#232323")
        .style('stroke-width', "2px");

      activeElement = this;
      d3.select(activeElement).raise();

      // Show pop-up with borough information
      let name = d.properties.name;
      let sentenceCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      let population = d.properties.population;
      let additionalInfo = d.properties.additionalInfo || "No additional information available.";

      d3.select('#popup')
        .html(`
            <div class="close-btn" onclick="hidePopup()">x</div>
            <h3>${sentenceCaseName}</h3>
            <p>Population: ${population.toLocaleString()}</p>
            <p>${additionalInfo}</p>
            <p>More details...</p>
        `)
        .style('display', 'block')
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY + 10}px`);
    }
  } catch (error) {
    console.error("Error showing popup:", error);
  }
}
function hidePopup() {
  d3.select('#popup').style('display', 'none');
}
d3.select('body').on('click', function(event) {
  if (!event.target.closest('#popup') && !event.target.closest('path')) {
    hidePopup();
  }
});

d3.selectAll('#plot g.map path').on('click', function(event, d) {
  handleClick.call(this, d, event);
  event.stopPropagation(); // Prevent triggering the body click event
});

d3.selection.prototype.raise = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

function updateProjectionAndPath(topojsonData) {
  let objectName = Object.keys(topojsonData.objects)[0];
  let geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);

  const padding = 20;
  projection.fitExtent([[padding, padding], [plotWidth - padding, plotHeight - padding]], geojson);
  geoGenerator.projection(projection);
}

function updateMap(topojsonData, dataType = 'population') {
  let objectName = Object.keys(topojsonData.objects)[0];
  let geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);

  let u = d3.select('#plot g.map')
    .selectAll('path')
    .data(geojson.features);

  u.enter()
    .append('path')
    .attr('d', geoGenerator)
    .attr('fill', d => colorScale(dataTypes[dataType](d))) // Apply color based on data type
    .on('mouseover', handleMouseover)
    .on('mouseout', handleMouseout)
    .on('click', function(event, d) {
      handleClick.call(this, d, event);
      event.stopPropagation();
    });

  u.attr('d', geoGenerator)
   .attr('fill', d => colorScale(dataTypes[dataType](d))); // Apply color based on data type

  let mergedGeometry = topojson.merge(topojsonData, topojsonData.objects[objectName].geometries);
  let mergedFeature = { type: "Feature", geometry: mergedGeometry };

  d3.select('#plot g.boundary')
    .append('path')
    .datum(mergedFeature)
    .attr('d', geoGenerator);
}

function update(topojsonData) {
  plotWidth = plotContainer.offsetWidth;
  plotHeight = plotContainer.offsetHeight;

  updateProjectionAndPath(topojsonData);
  updateMap(topojsonData);
}

d3.json('/flWebmap/data/plot/03_Istanbul_L3_Topo.json')
  .then(function(json) {
    topojsonData = json;

    colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(topojsonData.objects.ist.geometries, dataTypes['population'])]);
    update(json);

    window.addEventListener('resize', function() {
      plotWidth = plotContainer.offsetWidth;
      plotHeight = plotContainer.offsetHeight;
      d3.select('#plot g.map').selectAll('path').remove();
      d3.select('#plot g.boundary').selectAll('path').remove();
      update(json);
    });
  })
  .catch(function(error) {
    console.error('Error loading TopoJSON data:', error);
  });
