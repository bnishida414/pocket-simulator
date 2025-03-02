import { Card, CardContent, Typography } from "@mui/material";

interface GameCardProps {
  card: { id: number; value: string };
  onClick?: () => void;
  backgroundColor?: string;
};

export default function GameCard({ card, onClick, backgroundColor = "white" }: GameCardProps) {
  return (
    <Card 
      style={{ padding: "16px", width: "120px", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", backgroundColor: backgroundColor, cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" style={{ textAlign: "center" }}>{card.value}</Typography>
      </CardContent>
    </Card>
  );
};