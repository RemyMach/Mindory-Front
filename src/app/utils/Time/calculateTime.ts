
export function calculateTimeInSeconds(time: Date): number {
  console.log(time.getUTCSeconds());
  console.log(time.getUTCMinutes());
  console.log(time.getUTCHours());
  return time.getUTCSeconds() + time.getUTCMinutes() * 60 + time.getUTCHours() * 3600;
}

export function getTimeInHourMinuteSecondsFormat(time: Date): string {
  let result = '';
  result += time.getUTCHours() !== 0 ? `${time.getUTCHours()} heures ` : '';
  result += time.getUTCMinutes() !== 0 ? `${time.getUTCMinutes()} minutes ` : '';
  result += time.getUTCSeconds() !== 0 ? `${time.getUTCSeconds()} secondes ` : '';
  return result;
}
