import { createContext, useContext, useState } from 'react';

const GameSettingsContext = createContext();

export default function GameSettingsProvider({ children }) {
  const [play, setPlay] = useState(false);

  const [theme, setTheme] = useState('Numbers');
  const [players, setPlayers] = useState('1');
  const [grid, setGrid] = useState('4');
  const [tiles, setTiles] = useState('Circle');

  const gameSettings = { theme, players, grid, tiles };

  return (
    <GameSettingsContext.Provider value={{ play, setPlay, gameSettings, setTheme, players, setPlayers, setGrid, setTiles }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (!context) throw new Error('Settings Context Error');
  return context;
}
