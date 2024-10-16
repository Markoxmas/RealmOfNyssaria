import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import calculateBattleTime from "./lib/calculateBattleTime";
import formatBattleTime from "./lib/formatBattleTime";
import TimerIcon from "@mui/icons-material/Timer";

export default function BattleTimer() {
  const [timer, setTimer] = useState("00:00:00");
  const { battle } = useAppSelector((state) => state.battle);

  useEffect(() => {
    // So it calculates it when you switch back to the battle tab
    if (battle) {
      setTimer(formatBattleTime(calculateBattleTime(battle)));
    }

    // Calculation of the time every second
    const interval = setInterval(() => {
      if (battle) {
        setTimer(formatBattleTime(calculateBattleTime(battle)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [battle]);
  return (
    <div style={{ fontSize: 40, marginTop: 10 }}>
      <b>{timer}</b>
      <TimerIcon />
    </div>
  );
}