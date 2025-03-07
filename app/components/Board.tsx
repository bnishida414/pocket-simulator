import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import GameCard from "./GameCard";

interface CardType {
  id: number;
  value: string;
  type: string;
};

const initialDeck: CardType[] = [
  { id: 1, value: "Charmander", type: "basic" },
  { id: 2, value: "Pikachu", type: "basic" },
  { id: 3, value: "Mewtwo", type: "basic" },
  { id: 4, value: "Celebi", type: "basic" },
  { id: 5, value: "Dialga", type: "basic" },
  { id: 6, value: "Palkia", type: "basic" },
  { id: 7, value: "Arceus", type: "basic" },
];

export default function CardGameBoard() {
  // TODO: randomize initialDeck here and on reset
  const [deck, setDeck] = useState<CardType[]>(initialDeck);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [playerBoard, setPlayerBoard] = useState<(CardType | null)[]>(new Array(3).fill(null));
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const drawCard = (): void => {
    if (deck.length <= 0) return;
    const newDeck = [...deck];
    const drawnCard = newDeck.shift();
    if (drawnCard) {
      setDeck(newDeck);
      setPlayerHand([...playerHand, drawnCard]);
    }
  };

  const openMenu = (event: React.MouseEvent<HTMLDivElement>, card: CardType) => {
    setMenuAnchor(event.currentTarget);
    console.log('menu opened');
    setActiveCard(card);
  };

  const closeMenu = () => {
    console.log('menu closed');
    setMenuAnchor(null);
    setActiveCard(null);
  };

  const playActiveCard = (index: number): void => {
    if (activeCard && !playerBoard[index]) {
      setPlayerHand(playerHand.filter((c) => c.id !== activeCard.id));
      const newPlayerBoard = [...playerBoard];
      newPlayerBoard[index] = activeCard;
      setPlayerBoard(newPlayerBoard);
      setActiveCard(null);
    }
  };

  const resetState = (): void => {
    setDeck(initialDeck)
    setPlayerHand([])
    setPlayerBoard(new Array(3).fill(null))
    setActiveCard(null)
  }

  const getMenuOptions = (card: CardType) => {
    switch (card.type) {
      case "basic":
        return [
          // <MenuItem key="1" onClick={closeMenu}>To Active Spot</MenuItem>,
          <MenuItem key="2" onClick={closeMenu}>To Bench</MenuItem>
        ];
      default:
        return [<MenuItem key="1" >Select Card</MenuItem>];
    }
  };

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

      <Typography variant="h4">Card Game Board</Typography>

      <Typography variant="h5" style={{ marginTop: "16px" }}>Played Cards</Typography>
      <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
        {playerBoard.map((card, index) => (
          <>
            {card ? (
              <GameCard key={index} card={card} />
            ) : (
              <GameCard key={index} card={{ id: 0, value: "Play a Card Here" }} backgroundColor="#f0f0f0" onClick={() => playActiveCard(index)} />
            )}
          </>
        ))}
      </div>

      <Menu
        id="card-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        transformOrigin={{
          vertical:'bottom',
          horizontal: 'center'
        }}
        anchorOrigin={{
          vertical:'top',
          horizontal: 'center'
        }}
      >
        {activeCard && getMenuOptions(activeCard)}
      </Menu>
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        {playerHand.length > 0 ? (
          playerHand.map((card, index) => (
            <GameCard key={index} card={card} onClick={(event) => openMenu(event, card)} isActive={activeCard ? activeCard.id === card.id : false}/>
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
