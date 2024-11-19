
import React from 'react';
import './CharityCard.css';

interface CharityCardProps {
    name: string;
    description: string;
    imageUrl: string;
}

const CharityCard: React.FC<CharityCardProps> = ({ name, description, imageUrl }) => {
    return (
        <div className="charity-card">
            <img src={imageUrl} alt={name} className="charity-card__image" />
            <div className="charity-card__content">
                <h2 className="charity-card__name">{name}</h2>
                <p className="charity-card__description">{description}</p>
            </div>
        </div>
    );
};

export default CharityCard;
