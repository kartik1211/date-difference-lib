function getDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust the months and years if needed
    if (months < 0) {
        years--;
        months += 12;
    }

    // Adjust days if needed
    if (days < 0) {
        months--;
        const previousMonth = new Date(end.getFullYear(), end.getMonth() - 1, 0);
        days += previousMonth.getDate();
    }

    let result = '';
    if (years > 0) result += `${years} year${years > 1 ? 's' : ''}, `;
    if (months > 0) result += `${months} month${months > 1 ? 's' : ''}, `;
    if (days > 0 || (years === 0 && months === 0)) result += `${days} day${days > 1 ? 's' : ''}`;

    return result.trim().replace(/,$/, ''); 
}

// Export the function for use in other projects
module.exports = { getDateDifference };
