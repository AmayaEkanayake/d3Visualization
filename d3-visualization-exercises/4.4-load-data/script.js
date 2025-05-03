// Create a div for displaying data information
const dataInfo = d3.select("#data-info")
    .append("div")
    .style("background-color", "#f0f0f0")
    .style("padding", "10px")
    .style("margin-bottom", "20px")
    .style("border-radius", "5px");

// Step 1: Use row conversion function d3.csv() to give D3 access to data
d3.csv("tv_data.csv", d => {
    // Convert string values to appropriate types
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize, // Convert to number using unary plus operator
        technology: d.technology,
        count: +d.count, // Convert to number
        energyConsumption: +d.energyConsumption // Convert to number
    };
}).then(data => {
    // Log the data to console for inspection
    console.log(data);
    
    // Step 2: Check browser console tab for JavaScript objects created from data set
    // Display first row of data
    dataInfo.append("h3").text("First Data Row:");
    Object.entries(data[0]).forEach(([key, value]) => {
        dataInfo.append("p").text(`${key}: ${value} (${typeof value})`);
    });
    
    // Step 3: Finding information about the data set
    // Show data properties
    dataInfo.append("h3").text("Data Set Information:");
    
    // data.length
    dataInfo.append("p").text(`Number of rows: ${data.length}`);
    
    // Get column names (keys from first data object)
    const columns = Object.keys(data[0]);
    dataInfo.append("p").text(`Columns: ${columns.join(", ")}`);
    
    // Get min and max for energyConsumption
    const minEnergy = d3.min(data, d => d.energyConsumption);
    const maxEnergy = d3.max(data, d => d.energyConsumption);
    dataInfo.append("p").text(`Energy Consumption Range: ${minEnergy} to ${maxEnergy}`);
    
    // Sort the data by energyConsumption
    const sortedData = [...data].sort((a, b) => d3.ascending(a.energyConsumption, b.energyConsumption));
    
    // Display sorted data
    dataInfo.append("h3").text("Data Sorted by Energy Consumption:");
    const sortedTable = dataInfo.append("table")
        .style("border-collapse", "collapse")
        .style("width", "100%");
    
    // Add table header
    const headerRow = sortedTable.append("tr");
    columns.forEach(column => {
        headerRow.append("th")
            .style("border", "1px solid black")
            .style("padding", "5px")
            .text(column);
    });
    
    // Add table rows for first 5 entries
    sortedData.slice(0, 5).forEach(d => {
        const row = sortedTable.append("tr");
        columns.forEach(column => {
            row.append("td")
                .style("border", "1px solid black")
                .style("padding", "5px")
                .text(d[column]);
        });
    });
    
    // Now that we've explored the data, define a function to create the visualization
    createVisualization(data);
});

// Create the visualization function as shown in the exercise
function createVisualization(data) {
    console.log("Creating visualization with data:", data);
    
    // Create SVG as in previous exercise
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "500")
        .attr("viewBox", "0 0 800 500")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("border", "1px solid black");
    
    // Add title
    svg.append("text")
        .attr("x", 400)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("TV Energy Consumption by Brand");
    
    // Set up scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([50, 750])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([450, 50]);
    
    // Add bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.brand))
        .attr("y", d => yScale(d.energyConsumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 450 - yScale(d.energyConsumption))
        .attr("fill", d => {
            // Color based on technology
            if (d.technology === "OLED") return "green";
            if (d.technology === "QLED" || d.technology === "Neo QLED") return "blue";
            return "orange";
        });
    
    // Add x-axis
    svg.append("g")
        .attr("transform", "translate(0, 450)")
        .call(d3.axisBottom(xScale));
    
    // Add y-axis
    svg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(d3.axisLeft(yScale));
    
    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -250)
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Energy Consumption (W)");
}