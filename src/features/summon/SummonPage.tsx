import SummonCard from "./SummonCard";
import SummonModal from "./SummonModal";

export default function SummonPage() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <SummonCard />
      <SummonModal />
    </div>
  );
}
