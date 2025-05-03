// Variable to store our data globally
let tvData;

// Set initial dimensions
let width = 600;
let height = 400;
const margin = { top: 50, right: 30, bottom: 70, left: 60 };

// Listen for width slider changes
document.getElementById('chart-width').addEventListener('input', function() {
    width = parseInt(this.value);
    document.getElementById('width-value').textContent = width + 'px';
    
    // Update chart container width
    d3.select('.responsive-svg-container')
        .style('width', width + 'px');
    
    // Redraw the chart
    updateChart();
});

// Function to create and update the chart
function createBarChart() {
    // Clear any existing SVG
    d3.select('.responsive-svg-container').html('');
    
    // Create SVG container with viewBox for responsiveness
    const svg = d3.select('.responsive-svg-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Create a group for the chart elements with margins
    const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Step 1: Add Linear scale for count data (y-axis)
    // Create a linear scale for the continuous data (count)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(tvData, d => d.count)])
        .range([innerHeight, 0])
        .nice();
    
    // Step 2: Add a band scale (x-axis)
    // Create a band scale for the categorical data (brand)
    const xScale = d3.scaleBand()
        .domain(tvData.map(d => d.brand))
        .range([0, innerWidth])
        .padding(0.2);
    
    // Add bars using the scales
    chart.selectAll('.bar')
        .data(tvData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.brand))
        .attr('y', d => yScale(d.count))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.count))
        .attr('fill', 'blue');
    
    // Add x-axis
    chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');
    
    // Add y-axis
    chart.append('g')
        .attr('class', 'axis y-axis')
        .call(d3.axisLeft(yScale));
    
    // Add x-axis label
    chart.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + margin.bottom - 10)
        .style('text-anchor', 'middle')
        .text('TV Brand');
    
    // Add y-axis label
    chart.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -margin.left + 15)
        .style('text-anchor', 'middle')
        .text('Count');
    
    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('TV Sales by Brand');
}

// Function to update the chart when window is resized
function updateChart() {
    if (tvData) {
        createBarChart();
    }
}

// Load the data from CSV
d3.csv('tv_data.csv', d => {
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize,
        technology: d.technology,
        count: +d.count,
        energyConsumption: +d.energyConsumption
    };
}).then(data => {
    console.log('Data loaded:', data);
    tvData = data;
    
    // Initialize the chart
    createBarChart();
    
    // Set the initial width of the container
    d3.select('.responsive-svg-container')
        .style('width', width + 'px');
    
    // Add window resize listener
    window.addEventListener('resize', function() {
        // Only update if container width changes significantly
        const containerWidth = d3.select('.responsive-svg-container').node().getBoundingClientRect().width;
        if (Math.abs(containerWidth - width) > 10) {
            width = Math.min(800, Math.max(300, containerWidth));
            document.getElementById('chart-width').value = width;
            document.getElementById('width-value').textContent = width + 'px';
            updateChart();
        }
    });
}).catch(error => {
    console.error('Error loading the CSV file:', error);
});