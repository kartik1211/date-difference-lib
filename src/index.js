function getDateDifference(startDate, endDate, options = {}) {
    const {
        utc = true,        // Use UTC calendar math by default
        signed = false,    // Absolute difference by default
        asObject = false   // Return string by default (backward compatible)
    } = options;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
        throw new TypeError("Invalid date input");
    }

    // Handle direction
    let from = start;
    let to = end;
    let sign = 1;

    if (start > end) {
        if (signed) {
            sign = -1;
        } else {
            from = end;
            to = start;
        }
    }

    // Date getters (UTC vs local)
    const get = utc
        ? {
            y: d => d.getUTCFullYear(),
            m: d => d.getUTCMonth(),
            d: d => d.getUTCDate()
        }
        : {
            y: d => d.getFullYear(),
            m: d => d.getMonth(),
            d: d => d.getDate()
        };

    let years = get.y(to) - get.y(from);
    let months = get.m(to) - get.m(from);
    let days = get.d(to) - get.d(from);

    // Normalize days
    if (days < 0) {
        months--;
        const daysInPrevMonth = new Date(
            get.y(to),
            get.m(to),
            0
        ).getDate();
        days += daysInPrevMonth;
    }

    // Normalize months
    if (months < 0) {
        years--;
        months += 12;
    }

    years *= sign;
    months *= sign;
    days *= sign;

    if (asObject) {
        return { years, months, days };
    }

    // Build human-readable string
    let result = '';
    if (years) result += `${years} year${Math.abs(years) !== 1 ? 's' : ''}, `;
    if (months) result += `${months} month${Math.abs(months) !== 1 ? 's' : ''}, `;
    if (days || (!years && !months)) {
        result += `${days} day${Math.abs(days) !== 1 ? 's' : ''}`;
    }

    return result.trim().replace(/,$/, '');
}

// Export the function for use in other projects
module.exports = { getDateDifference };
