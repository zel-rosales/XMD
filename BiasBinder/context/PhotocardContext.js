import React, { createContext, useState } from 'react';

// Create context
export const PhotocardContext = createContext();

export const PhotocardProvider = ({ children }) => {
  // State to manage favorites and ownership for each card
  const [favorites, setFavorites] = useState({});
  const [ownership, setOwnership] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the favorite status
    }));
  };

  const toggleOwnership = (id) => {
    setOwnership((prev) => ({
      ...prev,
      [id]: prev[id] === 'Own' ? 'ISO' : 'Own', // Toggle ownership between 'Own' and 'ISO'
    }));
  };

  return (
    <PhotocardContext.Provider value={{ favorites, ownership, toggleFavorite, toggleOwnership }}>
      {children}
    </PhotocardContext.Provider>
  );
};
