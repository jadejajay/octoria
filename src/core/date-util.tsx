export function isDateInRange(dateString: string): boolean {
  // Parse the input date string to create a Date object
  if (dateString === 'every') return true;
  const inputDate = new Date(
    parseInt(dateString.split('/')[2], 10),
    parseInt(dateString.split('/')[1], 10) - 1,
    parseInt(dateString.split('/')[0], 10)
  );

  // Calculate the difference in milliseconds between the input date and today
  const timeDifference = inputDate.getTime() - new Date().getTime() + 86400000;

  // Calculate the number of days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Check if the date is within a 30-day range from today
  return daysDifference >= 0 && daysDifference <= 30;
  // return true;
}
export function formatDateLabel(dateString: string): string {
  if (dateString === 'every') return 'Today';
  // Parse the input date string to create a Date object
  const inputDate = new Date(
    parseInt(dateString.split('/')[2], 10),
    parseInt(dateString.split('/')[1], 10) - 1,
    parseInt(dateString.split('/')[0], 10)
  );

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();
  const isTomorrow =
    inputDate.getDate() === tomorrow.getDate() &&
    inputDate.getMonth() === tomorrow.getMonth() &&
    inputDate.getFullYear() === tomorrow.getFullYear();

  if (isToday) {
    return 'Today';
  } else if (isTomorrow) {
    return 'Tomorrow';
  } else {
    // Format the date as "dd month"
    const options: any = { month: 'long', day: '2-digit' };
    return inputDate.toLocaleDateString('en-IN', options);
  }
}
