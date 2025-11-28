const { getDateDifference } = require('../src');

console.log(getDateDifference('2020-01-01', '2023-10-15')); // Should print: "3 years, 9 months, 14 days"
console.log(getDateDifference('2022-05-05', '2023-05-06')); // Should print: "1 year, 1 day"
