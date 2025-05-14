import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const PhotocardContext = createContext();

export const PhotocardProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const [ownership, setOwnership] = useState({});

  // Load saved data on mount
  useEffect(() => {
    const loadData = async () => {
      const storedFavorites = await SecureStore.getItemAsync('favorites');
      const storedOwnership = await SecureStore.getItemAsync('ownership');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      if (storedOwnership) setOwnership(JSON.parse(storedOwnership));
    };
    loadData();
  }, []);

  // Save to SecureStore
  const saveData = async (key, value) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  };

  const toggleFavorite = (id) => {
    const updated = { ...favorites, [id]: !favorites[id] };
    setFavorites(updated);
    saveData('favorites', updated);
  };

  const toggleOwnership = (id) => {
    const current = ownership[id];
    const next = current === 'Own' ? 'ISO' : current === 'ISO' ? null : 'Own';
    const updated = { ...ownership, [id]: next };
    if (!next) delete updated[id];
    setOwnership(updated);
    saveData('ownership', updated);
  };

  return (
    <PhotocardContext.Provider value={{ favorites, ownership, toggleFavorite, toggleOwnership }}>
      {children}
    </PhotocardContext.Provider>
  );
};
