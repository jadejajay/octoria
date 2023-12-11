// Example usage

export function getGreetingByTimezone() {
  var hour = new Date().getHours(); //Current Hours
  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else if ((hour >= 18 && hour < 23) || (hour >= 0 && hour < 5)) {
    greeting = 'Good evening';
  } else {
    greeting = '';
  }

  return greeting;
}
