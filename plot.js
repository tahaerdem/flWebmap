var plotContainer = document.getElementById('plot01');
var plotWidth = plotContainer.offsetWidth;
var plotHeight = plotContainer.offsetHeight;

let projection = d3.geoMercator()
  .scale(25000)
  .center([29, 41]) // Center on Istanbul
  .translate([plotWidth / 2, plotHeight / 2]);

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

    d3.select('#content .info')
      .text(sentenceCaseName + ' (Area: ' + pixelArea.toFixed(1) + ' Border = ' + measure.toFixed(1) + ')')
      .style('left', (e.pageX + 10) + 'px')
      .style('top', (e.pageY + 10) + 'px');

    d3.select('#content .bounding-box rect')
      .attr('x', bounds[0][0])
      .attr('y', bounds[0][1])
      .attr('width', bounds[1][0] - bounds[0][0])
      .attr('height', bounds[1][1] - bounds[0][1]);

    d3.select('#content .centroid')
      .style('display', 'inline')
      .attr('transform', 'translate(' + centroid + ')');
    
    d3.select(this).classed('onHover', true).raise();

  } else {
  }
}
function handleMouseout() {
  d3.select('#content .info').text('');
  d3.select('#content .bounding-box rect').attr('width', 0).attr('height', 0);
  d3.select('#content .centroid').style('display', 'none');

  if (!d3.select(this).classed('active')) {
    d3.select(this).classed('onHover', false);
  }
}

function handleClick(d) {
  // Remove existing active style from any previously active features
  d3.selectAll('#content g.map path.active')
    .classed('active', false)
    .classed('inactive', true);

  d3.select(this)
    .classed('active', true)
    .classed('inactive', false);

  // Fade out all features but the one active
  d3.selectAll('#content g.map path')
    .transition()
    .duration(500)
    .ease(d3.easePolyOut)
    .style('opacity', function() {
      return d3.select(this).classed('active') || d3.select(this).classed('onHover') ? 1 : 0.1;
    });
}

function update(topojsonData) {
  console.log('TopoJSON Data:', topojsonData); // Log the TopoJSON data to inspect its structure

  let objectName = Object.keys(topojsonData.objects)[0]; // Dynamically get the first object name
  console.log('Using TopoJSON Object:', objectName); // Log the object name being used

  let geojson = topojson.feature(topojsonData, topojsonData.objects[objectName]);
  if (geojson.features && geojson.features.length > 0) {
    let bounds = d3.geoBounds(geojson);
    let dx = bounds[1][0] - bounds[0][0];
    let dy = bounds[1][1] - bounds[0][1];
    let x = (bounds[0][0] + bounds[1][0]) / 2;
    let y = (bounds[0][1] + bounds[1][1]) / 2;

    projection
      .center([x, y])
      .translate([plotWidth / 2, plotHeight / 2]);

    let u = d3.select('#content g.map')
      .selectAll('path')
      .data(geojson.features);

    u.enter()
      .append('path')
      .attr('d', geoGenerator)
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout)
      .on('click', function(d) {
        handleClick.call(this, d); // Use `call` to set `this` correctly
      });

    u.attr('d', geoGenerator);

    // Merge the geometries
    let mergedGeometry = topojson.merge(topojsonData, topojsonData.objects[objectName].geometries);

    // Create a GeoJSON feature for the merged geometry
    let mergedFeature = { type: "Feature", geometry: mergedGeometry };

    d3.select('#content g.boundary')
      .append('path')
      .datum(mergedFeature)
      .attr('d', geoGenerator);
  } else {
    console.error('GeoJSON features are empty or not defined', geojson);
  }
}

d3.json('/data/plot/istanbul-base-topo.json')
  .then(function(json) {
    console.log('TopoJSON Data:', json);
    update(json);
  })
  .catch(function(error) {
    console.error('Error loading TopoJSON data:', error);
  });