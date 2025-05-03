# Exercise 4.3: D3 Set Up

## Objective
Set up a responsive SVG container for D3 visualizations and create a foundation for a bar chart.

## Description
This exercise focuses on creating a proper D3.js environment for visualizations, specifically a responsive SVG container that will adjust to different screen sizes. You'll also create a basic SVG structure that will later be populated with data from a CSV file.

## Steps to Complete

### Step 1: Delete code from Exercise 4.2
- Start with a clean slate
- Keep only the D3 library import and your JS file reference
- Set up a basic HTML structure

### Step 2: Add a class to style the container for SVG elements
- Create a CSS class for a responsive SVG container
- Add a div with that class to contain your SVG
- The container should adapt to different screen sizes with:
  - `width: 100%`
  - `max-width` and `min-width` constraints
  - Centered positioning

### Step 3: Create SVG object within the responsive div
- Use D3 to create an SVG element within the container
- Set SVG attributes for responsiveness:
  - `width: 100%`
  - `viewBox` for consistent coordinate system
  - `preserveAspectRatio` to maintain aspect ratio
- Add a border to visualize SVG boundaries

### Step 4: Add a test rectangle
- Create a simple rectangle at the top of the SVG canvas
- This serves as a visual test that the SVG is working

## Key Concepts

### Responsive SVG Container
```css
.responsive-svg-container {
    margin: auto;
    display: block;
    width: 100%;
    max-width: 800px;
    min-width: 300px;
}
```

### SVG with ViewBox
```javascript
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "400")
    .attr("viewBox", "0 0 800 400")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("border", "1px solid black");
```

## Why This Matters

Setting up a responsive container is crucial for creating visualizations that work well across different devices and screen sizes. The `viewBox` and `preserveAspectRatio` attributes are key to making SVGs that maintain their proportions when resized.

This foundation will be built upon in subsequent exercises as you add data-driven elements to your visualization.

## Testing
To test your solution:
1. Resize the browser window to see how the SVG container adapts
2. Verify that the test rectangle is visible and positioned correctly
3. Check that the SVG maintains its aspect ratio when resized

## Next Steps
In the next exercise, you'll learn how to load data from a CSV file and format it for use in your visualization.