
export function hourToMinuts(hourMinute: string) {
  const [hour, minutes] = hourMinute.split(":");
  return parseInt(hour) * 60 + parseInt(minutes);
}