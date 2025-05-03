# Exercise 4.4: Load Data from CSV

## Objective
Learn how to load and format data from CSV files for use in D3.js visualizations.

## Description
This exercise focuses on loading data from CSV files into D3.js and properly formatting it for visualization. You'll learn how to convert string values to appropriate data types, explore the structure of the loaded data, and prepare it for use in subsequent visualizations.

## Steps to Complete

### Step 1: Use row conversion function d3.csv() to give D3 access to data
- Load data from a CSV file using `d3.csv()`
- Use a row conversion function to process each row and convert string values to appropriate types
- Example:
  ```javascript
  d3.csv("tv_data.csv", d => {
      return {
          brand: d.brand,
          model: d.model,
          count: +d.count // Convert to number
      };
  }).then(data => {
      // Process data here
  });
  ```

### Step 2: Check browser console for JavaScript objects created from data set
- Log the data to the console to verify it's loaded correctly
- Inspect the data objects to ensure values are converted to proper types
- Confirm that numeric values are no longer strings

### Step 3: Find information about the data set
- Use D3 utility functions to explore the dataset:
  - `data.length` - Get the number of rows
  - `Object.keys(data[0])` - Get column names
  - `d3.min()` and `d3.max()` - Find data ranges
  - `d3.sort()` - Sort the data

## Key D3 Data Functions

- `d3.csv()` - Loads and parses a CSV file
- `d3.min()` and `d3.max()` - Find minimum and maximum values
- `d3.extent()` - Returns [min, max] array for a dataset
- `d3.ascending()` and `d3.descending()` - Helper functions for sorting

## Why This Matters

Loading and properly formatting data is a crucial step in the data visualization process. CSV files store everything as strings, so explicit type conversion is necessary to ensure your visualization functions correctly. Understanding your data's structure and range is also essential for creating appropriate scales and visualizations.

## Example Data Structure

After loading and converting, your data should look something like this:
```javascript
[
  { brand: "Samsung", model: "Q60T", count: 25, energyConsumption: 120 },
  { brand: "LG", model: "CX", count: 18, energyConsumption: 100 },
  ...
]
```

## Testing
To test your solution:
1. Check the browser console to verify data is loaded
2. Confirm that numeric values have been converted (they won't be in quotes)
3. Try using various D3 utility functions to explore the data

## Next Steps
In the next exercise, you'll learn how to bind this data to DOM elements to create a bar chart visualization.