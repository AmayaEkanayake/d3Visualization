# Exercise 4.1: Draw SVGs

## Objective
Become familiar with creating and formatting SVG primitives (shapes).

## Description
In this exercise, you will create a picture of a house and garden using different SVG shapes. The purpose is to understand the SVG coordinate system and basic shape elements that serve as building blocks for D3 visualizations.

## Steps to Complete

### Step 1: Create a picture with SVG shapes
- Create a house and garden scene using various SVG elements (rectangles, circles, paths, etc.)
- Incorporate text elements
- Demonstrate different SVG shapes and their attributes

### Step 2: Become familiar with the SVG coordinate system
- Take screenshots showing how coordinates in code match with drawing
- Understand that in SVG:
  - The origin (0,0) is at the top-left corner
  - X-axis increases from left to right
  - Y-axis increases from top to bottom

### Step 3: Customize your picture
- Change/move shapes
- Modify fill colors
- Adjust stroke attributes
- Add additional elements

### Step 4: Become familiar with the group element
- Group related elements (like windows) using the `<g>` element
- Apply styling to multiple elements at once
- Use transform and translate to position elements

### Step 5: View the DOM
- Open the webpage in a browser
- Use Developer Tools to examine the SVG elements in the DOM
- Take a screenshot of the DOM structure

## Key SVG Elements Used
- `<rect>`: For rectangles (house, ground, sky)
- `<circle>`: For circles (sun, door knob)
- `<polygon>`: For shapes with straight lines (roof)
- `<path>`: For complex shapes with curves (walkway)
- `<text>`: For adding text
- `<g>`: For grouping related elements
- `<line>`: For straight lines

## Understanding SVG Attributes
- Position attributes: x, y, cx, cy, points, d
- Size attributes: width, height, r, rx, ry
- Style attributes: fill, stroke, stroke-width

## Why This Matters for D3
This exercise provides the foundation for understanding how SVG works, which is crucial for using D3.js effectively. D3 generates SVG elements programmatically based on data, so understanding the underlying SVG structure is essential.

## Learning Resources
- "D3.js in Action" by Dufour and Meeks (particularly Section 1.2.2)
- Mozilla Developer Network's "Tutorial - Introducing SVG from Scratch"