function getDateDifference(startDate, endDate, options = {}) {
    const {
        utc = true,
        signed = false,
        asObject = false,
        includeTime = false,
        includeZeroUnits = false
    } = options;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime())) {
        throw new TypeError("Invalid startDate");
    }
    if (Number.isNaN(end.getTime())) {
        throw new TypeError("Invalid endDate");
    }

    // Direction handling
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

    // Date getters
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

    // Calendar diff
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

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (includeTime) {
        // Anchor date after Y/M/D diff
        const anchor = new Date(from);

        if (utc) {
            anchor.setUTCFullYear(anchor.getUTCFullYear() + years);
            anchor.setUTCMonth(anchor.getUTCMonth() + months);
            anchor.setUTCDate(anchor.getUTCDate() + days);
        } else {
            anchor.setFullYear(anchor.getFullYear() + years);
            anchor.setMonth(anchor.getMonth() + months);
            anchor.setDate(anchor.getDate() + days);
        }

        let diffMs = Math.abs(to.getTime() - anchor.getTime());

        seconds = Math.floor(diffMs / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
    }

    // Apply sign consistently
    years   *= sign;
    months  *= sign;
    days    *= sign;
    hours   *= sign;
    minutes *= sign;
    seconds *= sign;

    if (asObject) {
        const result = { years, months, days };
        if (includeTime) {
            result.hours = hours;
            result.minutes = minutes;
            result.seconds = seconds;
        }
        return result;
    }

    // Human-readable output
    const parts = [];

    if (years || includeZeroUnits) parts.push(`${years} year${Math.abs(years) !== 1 ? 's' : ''}`);
    if (months || includeZeroUnits) parts.push(`${months} month${Math.abs(months) !== 1 ? 's' : ''}`);
    if (days || includeZeroUnits) parts.push(`${days} day${Math.abs(days) !== 1 ? 's' : ''}`);

    if (includeTime) {
        if (hours || includeZeroUnits) parts.push(`${hours} hour${Math.abs(hours) !== 1 ? 's' : ''}`);
        if (minutes || includeZeroUnits) parts.push(`${minutes} minute${Math.abs(minutes) !== 1 ? 's' : ''}`);
        if (seconds || includeZeroUnits) parts.push(`${seconds} second${Math.abs(seconds) !== 1 ? 's' : ''}`);
    }

    // Ensure something is returned
    if (parts.length === 0) parts.push("0 days");

    return parts.join(", ");
}

// Export
module.exports = { getDateDifference };
