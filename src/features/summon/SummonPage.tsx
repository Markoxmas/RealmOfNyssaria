import { useEffect } from "react";
import { fetchScrollData } from "./summonSlice";
import { useAppDispatch } from "../../app/hooks";
import SummonCard from "./SummonCard";
import SummonModal from "./SummonModal";

export default function SummonPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchScrollData());
  }, []);
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <SummonCard />
      <SummonModal />
    </div>
  );
}
