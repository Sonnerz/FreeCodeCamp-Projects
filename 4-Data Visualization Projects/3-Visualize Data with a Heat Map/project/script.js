
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(function (data) {


  const rectSizes = { width: 6, height: 30 };
  const margin = { top: 50, right: 30, bottom: 100, left: 80 };
  const width = rectSizes.width * Math.ceil(data.monthlyVariance.length / 12);
  const height = rectSizes.height * 12;
  const baseTemp = +data.baseTemperature;
  const dataset = data.monthlyVariance;
  data.monthlyVariance.forEach(function (d) {
    d.year = d.year;
    d.month = d.month;
    d.variance = +d.variance;
  });
  const baseTempWithVariance = dataset.map(d => {
    return baseTemp + d.variance;
  });

  const svg = d3.select(".svg-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // X SCALE - YEAR /////////////////////////////
  const xScale = d3.scaleBand()
    .domain(data.monthlyVariance.map(y => y.year))
    .range([0, width]);

  const xAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter(year => year % 9 === 0))
    .tickFormat(function (year) {
      var date = new Date(0);
      date.setUTCFullYear(year + 1)
      return d3.timeFormat("%Y")(date);
    })
    .tickSize(10, 1);

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .attr("id", "x-axis")
    .call(xAxis)
  svg.append('text')
    .attr("class", "label")
    .attr("transform", "translate(200, 35)")
    .attr('x', -80)
    .attr("y", 370)
    .text("Years");


  //Y SCALE - MONTHS  ///////////////////////////////////
  const yScale = d3.scaleBand()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) //months
    .range([0, height], 0, 0);

  const yAxis = d3.axisLeft(yScale)
    .tickValues(yScale.domain())
    .tickFormat(function (month) {
      var date = new Date(0);
      date.setUTCMonth(month);
      return d3.timeFormat("%B")(date);
    });

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .attr("id", "y-axis")
    .call(yAxis)
  svg.append('text')
    .attr("class", "label")
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + (height / 2) + ")" + "rotate(-90)")
    .attr("x", -130)
    .attr("y", -170)
    .text("Months");

  const colours = ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'];

  const heatmapColour = d3.scaleLinear()
    .domain(d3.range(0, 1, 1.0 / (colours.length)))
    .range(colours);

  // linear colour scale
  var colourScale = d3.scaleLinear()
    .domain(d3.extent(baseTempWithVariance))
    .range([0, 1]);

  // RECT
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("width", rectSizes.width)
    .attr("height", (d, i) => yScale.bandwidth(d.month))
    .attr("data-month", (d, i) => d.month == 12 ? d.month = 0 : d.month)
    .attr("data-year", d => d.year)
    .attr("data-temp", (d, i) => (baseTemp + d.variance).toFixed(2))
    .attr("x", (d, i) => xScale(d.year) - margin.left + 161)
    .attr("y", (d, i) => yScale(d.month))
    .style("fill", function (d, i) {
      return heatmapColour(colourScale(baseTempWithVariance[i]))
    })

    .on("mouseover", function (d, i) {
      const mth = new Date(0, d.month + 1 - 1, 1, 0, 0, 0);
      const xPosition = parseFloat(d3.select(this).attr("x")) + 120;
      const yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;
      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .attr("data-year", d.year)
        .select("#value")
        .html(
          '<p>Date: ' + d3.timeFormat("%B")(mth) + ", " + d.year + '</p> '
          + '<p>Variance: ' + d.variance + '</p>'
          + '<p>Temperature: ' + (baseTemp + d.variance).toFixed(2) + '</p>');
      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function () {
      d3.select("#tooltip")
        .attr("class", "hidden")
    })

  const tDiff = d3.max(dataset, (d) => (baseTemp + d.variance)) - d3.min(dataset, (d) => (baseTemp + d.variance));
  let tMin = d3.min(dataset, (d) => (baseTemp + d.variance))
  const tRange = [];
  for (let i = 0; i < 11; i++) {
    tMin += (tDiff / 11);
    tRange.push(+((tMin).toFixed(1)));
  }
  console.log(tRange)

  //LEGEND
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", 0)
    .attr("y", 0)
    .attr("id", "legend")
    .append("g")
    .attr("transform", "translate(" + margin.left + ")");

  legend.selectAll("legendSquares")
    .data(colours)
    .enter()
    .append("rect")
    .attr("x", function (d, i) { return 50 + i * (50 + 5) })
    .attr("y", 440)
    .attr("width", 55)
    .attr("height", 20)
    .style("stroke", "#000")
    .style("fill", function (d, i) {
      return colours[i];
    });

  const legTitle = d3.select('.svg-container')
    .data(tRange)
    .append('span')
    .attr("class", "legend-text")
    .html(tRange.map(d => "<span><" + d + "&#8451;</span>").join(''));

});
