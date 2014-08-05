var categories = ["Arts & Culture",
  "Career & Business",
  "Cars & Motorcycles",
  "Community & Environment",
  "Dancing",
  "Education & Learning",
  "Fashion & Beauty",
  "Fitness",
  "Food & Drink",
  "Games",
  "Movements & Politics",
  "Health & Wellbeing",
  "Hobbies & Crafts",
  "Language & Ethnic Identity",
  "LGBT",
  "Lifestyle",
  "Literature & Writing",
  "Movies & Film",
  "Music",
  "New Age & Spirituality",
  "Outdoors & Adventure",
  "Paranormal",
  "Parents & Family",
  "Pets & Animals",
  "Photography",
  "Religion & Beliefs",
  "Sci-Fi & Fantasy",
  "Singles",
  "Socializing",
  "Sports & Recreation",
  "Support",
  "Tech",
  "Women"];

var margin = { top: 20, right: 30, bottom: 30, left: 40 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.1);

var yScale = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var containerGroup = d3.select("#svg-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Drop down options
d3.select('#category-selection')
  .selectAll('option')
    .data(categories)
  .enter().append('option')
    .attr('value', function(d){ return d; })
    .text(function(d){ return d; });

// Create Chart
var createChart = function(index, value) {
  d3.json("meetup_data.json", function(error, data) {

    data = data[index][value];

    if(error){ alert('Error'); }

    xScale.domain(data.map(function(d) { return d.city; }));
    yScale.domain([0, d3.max(data, function(d) { return d.percent * 100; })]);

    containerGroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    containerGroup.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    containerGroup
      .selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.city); })
        .attr("y", function(d) { return yScale(d.percent * 100); })
        .attr("height", function(d) { return height - yScale(d.percent * 100); })
        .attr("width", xScale.rangeBand());
  });
};


// Drop down selection
d3.select('select')
  .on("change", function() {
  var index = this.selectedIndex;
  var value = this.selectedOptions[0].value;

  createChart(index, value);

});
