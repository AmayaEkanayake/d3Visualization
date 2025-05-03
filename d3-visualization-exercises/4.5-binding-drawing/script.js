// Define the createBarChart function that will build the chart
const createBarChart = (data) => {
    console.log("Creating bar chart with data:", data);
    
    // Set up chart dimensions
    const margin = { top: 40, right: 20, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG container
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "500")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Step 1: Bind the data to DOM elements
    // Create an SVG object that selects the elements we want to add
    // and represent our data (i.e., the rectangles)
    
    // Set up scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, width])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([height, 0]);
    
    // Select all bars (which don't exist yet) and bind data
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar") // Added class as mentioned in exercise
        .attr("x", d => xScale(d.brand))
        .attr("y", d => yScale(d.energyConsumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.energyConsumption))
        .attr("fill", d => {
            // Color based on count (demonstrated in exercise)
            return `rgb(0, 0, ${d.count * 5})`; // Blue shade based on count
        });
    
    // Step 2: Add attributes to bars for width and height
    // Already included in the code above with:
    // .attr("width", xScale.bandwidth())
    // .attr("height", d => height - yScale(d.energyConsumption))
    
    // Step 3: Space out the bars
    // Already handled by xScale with padding
    
    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
    
    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));
    
    // Add chart title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("TV Energy Consumption by Brand");
    
    // Add x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Brand");
    
    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (W)");
};

// Load the data from CSV
d3.csv("tv_data.csv", d => {
    // Convert string values to appropriate types
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize,
        technology: d.technology,
        count: +d.count,
        energyConsumption: +d.energyConsumption
    };
}).then(data => {
    console.log("Data loaded:", data);
    
    // Call the function to create the chart
    createBarChart(data);
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});