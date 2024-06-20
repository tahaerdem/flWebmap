var plotContainer = document.getElementById('plot01');
let plotWidth = plotContainer.offsetWidth;
var plotHeight = plotContainer.offsetHeight;

let projection = d3.geoMercator()
  .scale(1)
  .translate([plotWidth / 2, plotHeight + 100 / 2]);

let geoGenerator = d3.geoPath()
  .projection(projection);

  function handleMouseover(d, e) {
    if (d.properties && d.properties.name) {
      let name = d.properties.name;
      let sentenceCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      let pixelArea = geoGenerator.area(d);
      let bounds = geoGenerator.bounds(d);
      let centroid = geoGenerator.centroid(d);
      let measure = geoGenerator.measure(d);
  
      d3.select('#plot .info')
        .text(sentenceCaseName + ' (Area: ' + pixelArea.toFixed(1) + ' Border = ' + measure.toFixed(1) + ')')
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
        .style('stroke', "#aaa")
        .raise(); // Bring the hovered feature to the front
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
        .style('stroke', "#eee"); // Reset to the default color
    }
  }
  
  function handleClick(d) {
    // Remove active class and reset stroke color for all paths
    d3.selectAll('#plot g.map path')
      .classed('active', false)
      .classed('inactive', true)
      .transition()
      .duration(500)
      .style('stroke', "#eee")
      .style('stroke-width', "1px");

  
    // Set the clicked path as active
    d3.select(this)
      .classed('active', true)
      .classed('inactive', false)
      .transition()
      .duration(500)
      .style('stroke', "#aaa")
      .style('stroke-width', "4px")
      .raise(); // Bring the hovered feature to the front
  }

function updateProjectionAndPath(topojsonData) {
  let objectName = Object.keys(topojsonData.objects)[0];
  let geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);

  const padding = 20;
  projection.fitExtent([[padding, padding], [plotWidth - padding, plotHeight - padding]], geojson);
  geoGenerator.projection(projection);
}

function updateMap(topojsonData) {
  let objectName = Object.keys(topojsonData.objects)[0];
  let geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);

  let u = d3.select('#plot g.map')
    .selectAll('path')
    .data(geojson.features);

  u.enter()
    .append('path')
    .attr('d', geoGenerator)
    .on('mouseover', handleMouseover)
    .on('mouseout', handleMouseout)
    .on('click', function(d) {
      handleClick.call(this, d);
    });

  u.attr('d', geoGenerator);

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

d3.json('/flWebmap/data/istanbul.topo.json')
  .then(function(json) {
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