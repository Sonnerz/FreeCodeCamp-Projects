// get data
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then(function (dataset) {
  const margin = { top: 50, right: 30, bottom: 30, left: 80 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  const legendTitles = [
    "No doping allegations", "Riders with doping allegations"
  ];
  const legendColours = [
    "#3a6919", "#c42912"
  ];
  const myTimeFormat = "%M:%S";
  //   const dataArray = dataset.map(d => {
  //     d.Time = new Date(1970, 0, 1, 0, d3.timeParse(myTimeFormat)(d.Time)); 
  //   return 
  //   [
  //     d.Year,
  //     d.Time,
  //     d.Doping
  //   ]
  // });



  const dataArray = dataset.map(d => {
    var parsedTime = d.Time.split(':');
    d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    return [
      d.Year,
      d.Time,
      //d3.timeParse(myTimeFormat)(d.Time),
      d.Doping
    ]
  });

  // create a tooltip
  var tooltip = d3.select('.svg-container')
    .append('div')
    .attr("id", "tooltip")
    .attr('class', 'tooltip')
    .style("opacity", 0)

  //YEAR - X SCALE
  const xScale = d3.scaleLinear()
    .domain([
      d3.min(dataArray, (d) => d[0] - 1),
      d3.max(dataArray, (d) => d[0]) + 1])
    .range([margin.left, width]);

  //TIME - Y SCALE
  const yScale = d3.scaleTime()
    .domain([
      d3.max(dataArray, (d) => d[1]),
      d3.min(dataArray, (d) => d[1])])
    .range([height, 0]);


  const svg = d3.select(".svg-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.selectAll(".dot")
    .data(dataArray)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .style("stroke", "#000")
    .attr("fill", (d) => {
      return d[2] == "" ? legendColours[0] : legendColours[1];
    })
    .attr("data-xvalue", d => d[0])
    .attr("data-yvalue", d => d[1])
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", 6)

    .on("mouseover", function (d, i) {
      tooltip.transition()
        .duration(200)
        .style('opacity', .9)
    })

    .on("mousemove", function (d, i) {
      tooltip.html(
        '<p>YEAR: '
        + d[0]
        + '</p>'
        + '<p>TIME: '
        + d3.timeFormat("%M:%S")(d[1])
        + '</p>'
        + '<p>DOPING: '
        + d[2]
        + '</p>'
      )
        .attr("data-year", d[0])
        .style('left', d3.select(this).attr("cx") + "px")
        .style('top', d3.select(this).attr("cy") + "px");
    })

    .on("mouseout", function (d, i) {
      tooltip.transition()
        .duration(200)
        .style('opacity', 0)
    });


  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale);

  //X-AXIS
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("id", "x-axis")
    .call(xAxis.tickFormat(function (d, i) {
      return d
    }));


  //Y-AXIS
  svg.append("g")
    .attr("transform", "translate(80, 0)")
    .attr("id", "y-axis")
    .call(yAxis.tickFormat(function (d, i) {
      return d3.timeFormat("%M:%S")(d)
    }));


  //y-LABEL
  svg.append('text')
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr('x', -250)
    .attr('y', 10)
    .text("Time in Minutes");

  //LEGEND
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width)
    .attr("y", 25)
    .attr("id", "legend")
    .attr("height", 100)
    .attr("width", 100);

  legend.selectAll("legendSquares")
    .data(legendColours)
    .enter()
    .append("rect")
    .attr("x", 550)
    .attr("y", function (d, i) { return 50 + i * (20 + 5) })
    .attr("width", 15)
    .attr("height", 15)
    .style("stroke", "#000")
    .style("fill", ((d) => d))


  legend.selectAll("mylabels")
    .data(legendTitles)
    .enter()
    .append("text")
    .attr("x", 550 + 20 * 1.2)
    .attr("y", function (d, i) { return 50 + i * (25) + 10 })
    .style("fill", "black")
    .text((d) => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

});


