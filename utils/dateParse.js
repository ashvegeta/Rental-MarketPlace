// Function to parse custom date format to ISO format
function parseCustomDate(dateStr) {
  const [datePart, timePart] = dateStr.split(" ");
  const [month, day, year] = datePart.split("-");
  return new Date(`${year}-${month}-${day}T${timePart}`);
}

// Function to validate date format
function isValidDateFormat(dateStr) {
  const dateFormat = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
  return dateFormat.test(dateStr);
}

// Function to validate date ranges
function validateDateRange(startDate, endDate) {
  const start = parseCustomDate(startDate);
  const end = parseCustomDate(endDate);
  const now = new Date();

  if (isNaN(start) || isNaN(end)) {
    return { valid: false, message: "Invalid date format provided" };
  }

  if (start <= now) {
    return {
      valid: false,
      message: "Start date must be after the current date",
    };
  } else if (end <= start) {
    return { valid: false, message: "End date must be after start date" };
  }

  return { valid: true };
}

module.exports = {
  parseCustomDate,
  isValidDateFormat,
  validateDateRange,
};
