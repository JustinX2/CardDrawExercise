import React from 'react';

function Card({ card }){
    if (!card) return null;

    return (
        <div className="card">
            <h2>{card.name}</h2>
            <img src={card.image} alt={`${card.value} of ${card.suite}`} />
        </div>
    );
}

export default Card;
