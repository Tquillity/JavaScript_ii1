document.getElementById('startDate').addEventListener('change', calculateCourseLength);
document.getElementById('endDate').addEventListener('change', calculateCourseLength);

function calculateCourseLength() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    if (startDate.getTime() && endDate.getTime() && startDate <= endDate) {
        const totalDays = calculateTotalDays(startDate, endDate);
        const workingDays = calculateWorkingDays(startDate, endDate);

        document.getElementById('courseLength').value = `${workingDays} (${totalDays})`;
    } else {
        document.getElementById('courseLength').value = 'Starting date needs to be before end date';
    }
}

function calculateTotalDays(start, end) {
    return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

function calculateWorkingDays(start, end) {
    let count = 0;
    let currentDate = new Date(start);

    while (currentDate <= end) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Ignores counting 0 = Sunday, 6 = Saturday
            count++;
        }
        currentDate.setDate(currentDate.getDate() +1);
    }

    return count;
}

export { calculateCourseLength, calculateTotalDays, calculateWorkingDays };