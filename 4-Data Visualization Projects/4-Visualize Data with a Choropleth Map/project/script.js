const width = 960, height = 900;

const svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

const path = d3.geoPath()

queue()
  .defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json")
  .defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json")
  .await(ready);

function ready(error, us, data) {

  const states = topojson.feature(us, us.objects.states).features
  const counties = topojson.feature(us, us.objects.counties).features

  const bachPercentMin = d3.min(data, (d) => (d.bachelorsOrHigher))
  const bachPercentMax = d3.max(data, (d) => (d.bachelorsOrHigher))

  const pairBachWithId = {};
  const pairNameWithId = {};
  const pairFipsWithId = {};
  const pairStateWithId = {};

  const colorScale = d3.scaleThreshold()
    //.domain(color_domain)
    .domain(d3.range(bachPercentMin, bachPercentMax, (bachPercentMax - bachPercentMin) / 13))
    .range(["#dcdcdc", "#d0d6cd", "#bdc9be", "#aabdaf", "#97b0a0", "#84a491", "#719782", "#5e8b73", "#4b7e64", "#387255", "#256546", "#125937", "#004d28"]);

  data.forEach(function (d) {
    pairBachWithId[d.fips] = +d.bachelorsOrHigher;
    pairNameWithId[d.fips] = d.area_name;
    pairStateWithId[d.fips] = d.state;
    pairFipsWithId[d.fips] = +d.fips;
  });

  svg.selectAll(".county")
    .data(counties)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path)
    .style("fill", function (d) {
      return colorScale(pairBachWithId[d.id]);
    })
    .style("opacity", 0.8)
    .attr("data-fips", d => pairFipsWithId[d.id])
    .attr("data-education", function (d) { return pairBachWithId[d.id]; })
    .attr("data-countyname", function (d) { return pairNameWithId[d.id]; })
    .on("mouseover", function (d, i) {
      d3.select("#tooltip")
        .style("left", (d3.event.pageX + 20) + "px")
        .style("top", (d3.event.pageY - 30) + "px")
        .attr("id", "tooltip")
        .attr("data-education", pairBachWithId[d.id])
        .classed("selected", true)
        .classed("hidden", false)
        .select("#value")
        .html(
          '<p>Education: ' + pairBachWithId[d.id] + '%' + '</p> '
          + '<p>County: ' + pairNameWithId[d.id] + '</p> '
          + '<p>St: ' + pairStateWithId[d.id] + '</p> '
          + '<p>Fips: ' + pairFipsWithId[d.id] + '</p> ');
      //d3.select("#tooltip").classed("hidden", false);

    })
    .on("mouseout", function () {
      d3.select("#tooltip")
        .attr("class", "hidden")
    })

  const x = d3.scaleLinear()
    .domain([bachPercentMin, bachPercentMax])
    .rangeRound([200, 860]);

  const g = svg.append("g")
    .attr("class", "key")
    .attr("id", "legend")
    .attr("transform", "translate(0,640)");

  g.selectAll("rect")
    .data(colorScale.range().map(function (d) {
      d = colorScale.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
    .enter().append("rect")
    .attr("height", 20)
    .attr("x", function (d) { return x(d[0]); })
    .attr("width", function (d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function (d) { return colorScale(d[0]); });

  g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")

  g.call(d3.axisBottom(x)
    .tickSize(20)
    .tickFormat(function (x) { return Math.round(x) + '%' })
    .tickValues(colorScale.domain()))
    .attr("stroke-width", "1.5")
    .select(".domain")
    .remove();

};