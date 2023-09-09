function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const formattedHours = parseInt(hours, 10) % 12 || 12;
  const amPm = parseInt(hours, 10) < 12 ? "am" : "pm";
  return `${formattedHours}:${minutes}${amPm}`;
}

function formatDate(dateString) {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const daysDifference = Math.round((targetDate - currentDate) / oneDay);

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Tomorrow";
  } else if (daysDifference >= 2 && daysDifference <= 6) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const targetDayIndex = targetDate.getDay();
    return `${dayNames[targetDayIndex]} (in ${daysDifference} days)`;
  } else {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = targetDate.getDate();
    const month = targetDate.getMonth();
    return `${monthNames[month]} ${day}`;
  }
}

export default { formatTime, formatDate };
