// Generate a dummy dataset for TV energy consumption
const energyData = [
    { brand: "Samsung", model: "S1", consumption: 45 },
    { brand: "LG", model: "E200", consumption: 65 },
    { brand: "Sony", model: "X90", consumption: 75 },
    { brand: "Panasonic", model: "V50", consumption: 55 },
    { brand: "TCL", model: "P20", consumption: 40 },
    { brand: "Philips", model: "A30", consumption: 60 }
];

// Step 2: Create an SVG object within the responsive div
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "400")
    .attr("viewBox", "0 0 800 400")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("border", "1px solid black"); // Add border to see SVG boundaries

// Step 3: Add a test rectangle
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 800)
    .attr("height", 30)
    .attr("fill", "blue");

// Function to update chart when window is resized
function handleResize() {
    console.log("Window resized");
    // In a more complex implementation, you might adjust scales or other elements here
}

// Listen for window resize events
window.addEventListener('resize', handleResize);

// Create scales for the chart (preparing for the next step)
const xScale = d3.scaleBand()
    .domain(energyData.map(d => d.brand))
    .range([50, 750])
    .padding(0.2);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(energyData, d => d.consumption)])
    .range([350, 50]);

// Add bars from our energy data
svg.selectAll(".bar")
    .data(energyData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.brand))
    .attr("y", d => yScale(d.consumption))
    .attr("width", xScale.bandwidth())
    .attr("height", d => 350 - yScale(d.consumption))
    .attr("fill", "green");

// Add x-axis
svg.append("g")
    .attr("transform", "translate(0, 350)")
    .call(d3.axisBottom(xScale));

// Add y-axis
svg.append("g")
    .attr("transform", "translate(50, 0)")
    .call(d3.axisLeft(yScale));

// Add chart title
svg.append("text")
    .attr("x", 400)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("TV Energy Consumption Data");