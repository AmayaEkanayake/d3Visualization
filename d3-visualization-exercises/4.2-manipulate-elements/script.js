// Step 2: Apply style to html element using D3
// Select the h1 element and change its style
d3.select("h1")
  .style("color", "green");

// Experiment with selecting other elements and changing their appearance
d3.select("h2")
  .style("color", "blue");

d3.selectAll("li")
  .style("font-weight", "bold")
  .style("color", "darkgreen");

// Step 3: Append an element using D3
// Select the div element with id "content" and append a paragraph
d3.select("#content")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append an SVG using D3
// Add an SVG element to the visualization div
d3.select("#visualization")
  .append("svg")
  .attr("width", 400)
  .attr("height", 200)
  .attr("x", 50)
  .attr("y", 50)
  .style("border", "1px solid #ccc");

// Add a rectangle to the SVG
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 200)
  .attr("height", 100)
  .attr("fill", "green");

// Add more complex SVG elements
d3.select("svg")
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 100)
  .attr("r", 40)
  .attr("fill", "blue");

// Add text to the SVG
d3.select("svg")
  .append("text")
  .attr("x", 100)
  .attr("y", 30)
  .text("Energy Usage Visualization")
  .style("font-family", "Arial")
  .style("font-size", "14px");

// Use selectAll to see what happens!
console.log("Selected all divs:", d3.selectAll("div").nodes().length);