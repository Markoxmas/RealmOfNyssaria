import Card from "@mui/material/Card";

export default function Drop({
  name,
  amount,
  icon,
}: {
  name: string;
  amount: number;
  icon: string;
}) {
  return (
    <Card
      sx={{
        width: 130,
        height: 130,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>{name}</div>
      <img src={icon} width={60} height={60} />
      <div>{amount}</div>
    </Card>
  );
}
