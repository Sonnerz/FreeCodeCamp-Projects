document.addEventListener('DOMContentLoaded', e => {

  // Source Data into an object
  const dataset = {
    movie: {
      title: "Movie Sales",
      description: "Top 100 Highest Grossing Movies Grouped By Genre",
      url: "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json"
    },
    video: {
      title: "Video Game Sales",
      description: "Top 100 Most Sold Video Games Grouped by Platform",
      url: "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"
    },
    kick: {
      title: "Kickstarter Pledges",
      description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
      url: "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json"
    }
  }

  // add click to each nav a href
  document.querySelectorAll('#nav a')
    .forEach(el => {
      el.addEventListener('click', () => getDataSetTitles(event.target.name));
    });

  //get Data and set page titles: video || movie || kick
  function getDataSetTitles(dataChoice) {
    document.getElementById("title").innerHTML = dataset[dataChoice].title;
    document.getElementById("description").innerHTML = dataset[dataChoice].description;
    renderTreemap(dataset[dataChoice].url); //send json url to renderTreemap
  }

  //function to render the treemap using the json url
  function renderTreemap(url) {
    d3.selectAll('svg').remove();
    d3.selectAll('legend').remove();
    // set the dimensions and margins of the graph
    var margin = { top: 0, right: 10, bottom: 10, left: 10 },
      width = 960 - margin.left - margin.right,
      height = 570 - margin.top - margin.bottom;

    var tooltip = d3.select("body").append("div");

    // append the svg object to the map div
    var svg = d3.select("#map")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("position", "relative")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // read json data
    d3.json(url, function (error, data) {
      if (error) throw error;

      var root = d3.hierarchy(data)
        // .eachBefore(function (d) {
        //   d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
        // })
        .sum(function (d) { return d.value })
        .sort(function (a, b) { return b.height - a.height || b.value - a.value; });
      // Here the size of each leave is given in the 'value' field in input data

      // Then d3.treemap computes the position of each element of the hierarchy
      d3.treemap()
        .size([width, height])
        .paddingTop(28)
        .paddingRight(1)
        .paddingInner(1) // Padding between each rectangle
        //.paddingOuter(6)
        .padding(1)
        (root)

      // colourScale scale
      var colourScale = d3.scaleOrdinal()
        .domain([data.children.map(d => d.name)])
        .range(d3.schemeCategory20)

      // And a opacity scale
      var opacity = d3.scaleLinear()
        .domain([10, 30])
        .range([.5, 1])

      // add rectangles:
      svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("g")
        .append("rect")
        .attr("class", "tile")
        .style("position", "relative")
        .attr("data-name", d => d.data.name)
        .attr("data-category", d => d.data.category)
        .attr("data-value", d => d.data.value)
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("fill", function (d) { return colourScale(d.parent.data.name) })
        .style("opacity", function (d) { return opacity(d.data.value) })
        //tooltips
        .on("mouseover", function (d, i) {
          tooltip.style("left", (d3.event.pageX + 20) + "px")
          tooltip.style("top", (d3.event.pageY - 30) + "px")
          tooltip.attr("id", "tooltip")
          tooltip.style("display", "inline-block")
          tooltip.attr("data-value", d.data.value)
          tooltip.select("#value")
          tooltip.html(
            "<p><span>Category:</span> " + d.data.category + "</p> " +
            "<p><span>Name: </span>" + d.data.name + "</p> "
          );
        })
        .on("mouseout", function () {
          tooltip.style("display", "none");
        });

      // NAME labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .append("tspan")
        .attr("x", function (d) { return d.x0 + 5 })
        .attr("y", function (d) { return d.y0 + 5 })
        .html(function (d) { return d.data.name })
        .call(wrap, 100)
        .attr("class", "text")

      // create legend
      var legendLabels = data.children.map(d => d.name);

      var legend = d3.select('#legend')
        .append('svg')
        .attr('width', 550)
        .attr("class", "legend")
        .attr('transform', 'translate(0,' + 0 + ')');

      // create g for each legend item
      var legendItem = legend.selectAll('.legend-item')
        .data(legendLabels).enter()
        .append('g')
        .attr('transform', function (d, i) {
          return "translate(" + (i % 3 * 140 + 60) + "," + (Math.floor(i / 3) * 40 + 30) + ")";
        });

      // legend rectangle
      legendItem
        .append("rect")
        .attr('width', 15)
        .attr('height', 15)
        .attr("stroke", "#333")
        .attr('class', 'legend-item')
        .style('fill', function (d) {
          return colourScale(d);
        });

      // legend text
      legendItem
        .append("text")
        .attr('class', 'legend-text')
        .attr('x', 20)
        .attr('y', 13)
        .text(d => d);
    })
  }

  // set default dataset to movie, for when page loads first time
  getDataSetTitles("movie");

  // found on internet - to wrap the treemap text
  function wrap(text, width) {
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 1.1,
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

});