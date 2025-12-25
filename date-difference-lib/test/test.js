const { getDateDifference } = require('../src');

console.log(getDateDifference('2020-01-01', '2023-10-15')); // Should print: "3 years, 9 months, 14 days"
console.log(getDateDifference('2022-05-05', '2023-05-06')); // Should print: "1 year, 1 day"

console.log(getDateDifference('2023-01-01', '2024-01-01'));
// "1 year"

console.log(getDateDifference('2023-01-01', '2024-03-05', { asObject: true }));
// { years: 1, months: 2, days: 4 }

console.log(getDateDifference('2024-01-01', '2023-01-01', { signed: true }));
// "-1 year"

// Below will Throw Error
console.log(getDateDifference('invalid', '2023-01-01'));
