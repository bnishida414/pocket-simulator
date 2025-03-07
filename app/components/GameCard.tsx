import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface GameCardProps {
  card: { id: number, value: string };
  onClick?: (event?: any) => void;
  backgroundColor?: string;
  isActive?: boolean;
};

// Select options:
// To Active Spot
// To Action Spot (supporters)
// To Bench
// To Top of Deck
// To Hand
// To Discard Pile
// Add Energy

export default function GameCard({ card, onClick, backgroundColor = "white", isActive = false }: GameCardProps) {

  return (
    <Card 
      style={{
        padding: "16px",
        width: "120px",
        height: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        backgroundColor: backgroundColor,
        cursor: isActive ? "default" : "pointer",
        border: isActive ? "3px solid blue" : "3px solid transparent",
      }}
      onClick={onClick}
    >
      {/* <CardActionArea> */}
        <CardContent>
          <Typography variant="h6" style={{ textAlign: "center" }}>{card.value}</Typography>
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};