import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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
