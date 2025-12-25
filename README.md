# Date Difference Library

This library provides a function to calculate the difference between two dates in years, months, and days.

## Installation

To use this library in your project, you can install it via npm:

```bash
npm install date-difference-lib
```
# Usage: 

JS Project:

const { getDateDifference } = require('date-difference-lib');
console.log(getDateDifference("2023-01-01", "2024-01-01"));

React / Angular / Vue (TypeScript):

import { getDateDifference } from 'date-difference-lib';

const diff = getDateDifference("2023-01-01", "2024-01-01", { asObject: true });

console.log(diff.years); // 1

console.log(getDateDifference('2020-01-01', '2023-10-15'));  // Output: "3 years, 9 months, 14 days"

console.log(getDateDifference('2022-05-05', '2023-05-06'));  // Output: "1 year, 1 day"

# Accepted formats:

getDateDifference(new Date(2024, 0, 1), new Date(2024, 1, 1));

getDateDifference('2023-01-01', '2024-01-01', { utc: false });

// Returns the difference as object
getDateDifference("2024-01-01T10:00:00Z", "2024-02-01T10:00:00Z", { asObject: true });

getDateDifference(1704067200000, 1706745600000);

// negative difference preserved
getDateDifference('2024-01-01', '2023-01-01', { signed: true }); 


[https://www.npmjs.com/package/date-difference-lib?activeTab=readme](https://www.npmjs.com/package/date-difference-lib) 
