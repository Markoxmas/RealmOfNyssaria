// input time is in milliseconds
export default function formatBattleTime(time: number) {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  let formattedTime = "";
  if (hours > 9) {
    formattedTime += hours + ":";
  } else {
    formattedTime += "0" + hours + ":";
  }

  if (minutes > 9) {
    formattedTime += minutes + ":";
  } else {
    formattedTime += "0" + minutes + ":";
  }

  if (seconds > 9) {
    formattedTime += seconds;
  } else {
    formattedTime += "0" + seconds;
  }

  return formattedTime;
}
