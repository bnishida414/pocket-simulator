import { useState } from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";
import GameCard from "./GameCard";

interface CardType {
  id: number;
  value: string;
};

const initialDeck: CardType[] = [
  { id: 1, value: "Charizard" },
  { id: 2, value: "Pikachu" },
  { id: 3, value: "Mewtwo" },
];

export default function CardGameBoard() {
  // TODO: randomize initialDeck here and on reset
  const [deck, setDeck] = useState<CardType[]>(initialDeck);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [playedCards, setPlayedCards] = useState<CardType[]>([]);

  const drawCard = (): void => {
    if (deck.length <= 0) return;
    const newDeck = [...deck];
    const drawnCard = newDeck.shift();
    if (drawnCard) {
      setDeck(newDeck);
      setPlayerHand([...playerHand, drawnCard]);
    }
  };

  const playCard = (card: CardType): void => {
    setPlayerHand(playerHand.filter((c) => c.id !== card.id));
    setPlayedCards([...playedCards, card]);
  };

  const resetState = (): void => {
    setDeck(initialDeck)
    setPlayerHand([])
    setPlayedCards([])
  }

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <Typography variant="h4">Card Game Board</Typography>
      <Typography variant="h5" style={{ marginTop: "16px" }}>Played Cards</Typography>
      <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
        {playedCards.length > 0 ? (
          playedCards.map((card) => <GameCard key={card.id} card={card} />)
        ) : (
          <GameCard card={{ id: 0, value: "Play a Card Here" }} backgroundColor="#f0f0f0" />
        )}
      </div>
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        {playerHand.length > 0 ? (
          playerHand.map((card) => (
            <GameCard key={card.id} card={card} onClick={() => playCard(card)} />
          ))
        ) : (
          <GameCard card={{ id: 0, value: "Empty Hand" }} backgroundColor="#f0f0f0" />
        )}
      </div>
      <Button variant="contained" color="primary" onClick={drawCard} disabled={deck.length <= 0}>
        Draw Card
      </Button>
      <Typography variant="body1">Cards left in deck: {deck.length}</Typography>
      <Button variant="contained" color="error" onClick={resetState}>
        Reset
      </Button>
    </div>
  );
};
