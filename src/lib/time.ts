export function millisecondsToMinutesAndSeconds(milliseconds: number): string {
  const minutes: number = Math.floor(milliseconds / 60000);
  const seconds: string = ((milliseconds % 60000) / 1000).toFixed(0);

  return seconds === '60'
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds.padStart(2, '0')}`;
}
