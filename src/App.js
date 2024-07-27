import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import DrawButton from './components/DrawButton';
import { createDeck, drawCard } from './services/deckService';

function App() {
  const [deckId, setDeckId] = useState(null);
  const [card, setCard] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    async function initializeDeck() {
      const newDeck = await createDeck();
      setDeckId(newDeck.deck_id);
      setRemaining(newDeck.remaining);
    }
    initializeDeck();
  }, []);

  useEffect(() => {
    if (isDrawing && remaining > 0) {
      const id = setInterval(handleDrawCard, 1000);
      setTimerId(id);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isDrawing, remaining]);

  const handleDrawCard = async () => {
    if (remaining === 0) {
      alert('Error: no cards remaining!');
      setIsDrawing(false);
      return;
    }

    const result = await drawCard(deckId);
    setCard(result.cards[0]);
    setRemaining(result.remaining);
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <div className="card-container">
      <DrawButton isDrawing={isDrawing} onClick={toggleDrawing} />
      <Card card={card} />
    </div>
  );
}

export default App;