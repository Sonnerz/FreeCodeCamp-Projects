// get data
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function (dataSet) {
  const data = dataSet.data;
  const w = 800;
  const h = 400;
  const padding = 50;

  // create a tooltip
  var tooltip = d3.select('.svg-container')
    .append('div')
    .attr("id", "tooltip")
    .attr('class', 'tooltip')
    .style("opacity", 0)


  // XSCALE
  const xScale = d3.scaleTime()
    .domain(
      [
        new Date(d3.min(data, (d) => d[0])),
        new Date(d3.max(data, (d) => d[0]))
      ]
    )
    .range([padding, 788])

  const barWidth = w / xScale(data.length);

  // YSCALE
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([h, padding]);


  const svg = d3.select(".svg-container")
    .append("svg")
    .attr("class", "bar-chart")
    .attr("width", w)
    .attr("height", h+30)
    .style("padding-bottom", '50px');

  // RECT
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", barWidth)
    .attr("height", d => h - yScale(d[1]))
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1])
    .attr("x", (d, i) => (i * barWidth) + padding)
    .attr("y", (d) => yScale(d[1]) - padding + 20)

    .on("mouseover", function (d, i) {
      tooltip.transition()
        .duration(200)
        .style('opacity', .9)
      tooltip.html('<p>Date:' + d[0] + '</p>' + '<p>Data:' + d[1] + '</p>')
        .attr("data-date", d[0])
        .style('left', (i * barWidth) + 30 + 'px')
        .style('top', h - 200 + 'px');
    })

    .on("mouseout", function (d, i) {
      tooltip.transition()
        .duration(200)
        .style('opacity', 0)
    })

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -200)
    .attr('y', 70)
    .text('Gross Domestic Product');
  svg.append('text')
    .attr('x', 320)
    .attr('y', 420)
    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf');

  // AXIS
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", "translate(0," + (h - padding + 20) + ")")
    .attr("id", "x-axis")
    .attr("class", "tick")
    .call(xAxis);

  svg.append("g")
    .attr("transform", "translate(50, -30)")
    .attr("id", "y-axis")
    .attr("class", "tick")
    .call(yAxis);

});



