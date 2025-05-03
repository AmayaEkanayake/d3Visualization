// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 60, left: 100 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Load data from CSV
d3.csv("tv_data.csv").then(data => {
    console.log("Data loaded:", data);
    
    // Convert count to number
    data.forEach(d => {
        d.count = +d.count;
    });
    
    // Sort data by count (descending)
    data.sort((a, b) => d3.descending(a.count, b.count));
    
    // Create the chart
    createBarChart(data);
});

function createBarChart(data) {
    // Create SVG container
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
    
    // Create a group and translate it to respect margins
    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) * 1.1]) // Add 10% extra space for labels
        .range([0, width]);
    
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, height])
        .padding(0.2);
    
    // Add x-axis
    chart.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "middle");
    
    // Add y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
    
    // Step 1: Comment out rectangle attributes
    // Instead of directly adding rectangles, we'll group them with labels
    
    // Step 2: Add an object to hold groups (of text and rectangles)
    // Create a group for each data point
    const barAndLabel = chart.selectAll("g.bar-group")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "bar-group")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
    
    // Step 3: Add back the rectangles
    barAndLabel.append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "green");
    
    // Step 4: Add the category text (brand names)
    // Note: We don't need to add brand text because it's already shown by the y-axis
    
    // Add count value labels inside the bars
    barAndLabel.append("text")
        .attr("class", "bar-label")
        .attr("x", d => Math.min(xScale(d.count) / 2, xScale(d.count) - 40))
        .attr("y", yScale.bandwidth() / 2)
        .attr("dy", "0.35em") // Vertical centering
        .attr("text-anchor", "middle")
        .text(d => d.brand)
        .style("font-size", "12px")
        .style("fill", "white");
    
    // Add count value labels after the bars
    barAndLabel.append("text")
        .attr("class", "count-label")
        .attr("x", d => xScale(d.count) + 5)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dy", "0.35em") // Vertical centering
        .text(d => d.count)
        .style("font-size", "12px")
        .style("fill", "black");
    
    // Add title
    svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("TV Sales by Brand");
    
    // Add x-axis label
    svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", height + margin.top + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Number of Units Sold");
}