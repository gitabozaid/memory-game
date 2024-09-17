import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/general.scss';
import GameSettingsProvider from './GameSettings.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameSettingsProvider>
      <App />
    </GameSettingsProvider>
  </React.StrictMode>
);
