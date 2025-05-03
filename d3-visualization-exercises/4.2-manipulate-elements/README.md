# Exercise 4.2: Manipulate and Add Elements to a Webpage with D3

## Objective
Learn how to use D3.js to change the appearance of HTML elements and add new elements to your webpage.

## Description
This exercise builds on your knowledge of SVGs and introduces how to use D3.js to manipulate web pages by:
1. Changing the style of HTML elements
2. Adding new elements to the DOM
3. Creating and manipulating SVG elements

You'll work with a webpage about Energy Consumption and use D3 to modify elements and add content.

## Steps to Complete

### Step 1: Add a new js file for your D3 code
- Create a new JS file to contain your D3 code
- Include the D3 library using: `<script src="https://d3js.org/d3.v7.min.js"></script>`
- Link the script to your HTML file

### Step 2: Apply style to HTML elements using D3
- Use `d3.select()` to target HTML elements
- Apply styles using the `.style()` method
- For example: `d3.select("h1").style("color", "green");`
- Experiment with selecting other elements and changing their appearance

### Step 3: Append new elements using D3
- Use D3's `.append()` method to add new elements to the DOM
- Add a paragraph about energy consumption
- Example: `d3.select("#content").append("p").text("Purchasing a low energy consumption TV will help with your energy bills!");`

### Step 4: Append an SVG using D3
- Add an SVG element to your webpage using D3
- Add a rectangle to the SVG
- Set attributes for the SVG and rectangle
- Note that the SVG might not be visible until you add attributes like position, size, and color

## Key D3 Methods Used

- `d3.select()` - Select a single element
- `d3.selectAll()` - Select multiple elements
- `.style()` - Apply CSS styles to selected elements
- `.append()` - Add new elements to the DOM
- `.attr()` - Set attributes on elements
- `.text()` - Set the text content of an element

## Why This Matters

This exercise demonstrates the fundamental D3 pattern of:
1. **Selection**: Finding elements in the DOM
2. **Modification**: Changing their properties
3. **Creation**: Adding new elements

These are the building blocks for more complex D3 visualizations where elements are created and modified based on data.

## Example Output

After completing this exercise, you will have:
- HTML elements with styles applied via D3
- New elements added to the DOM
- An SVG with a rectangle created entirely with D3

## Next Steps

In the next exercise, you'll learn how to set up a proper D3 environment for creating data visualizations, including establishing a responsive SVG container.