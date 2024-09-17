import { useGameSettings } from './GameSettings';
import StartGame from './features/StartGame/StartGame';
import Game from './features/Game/Game';

function App() {
  const { play } = useGameSettings();

  return <main>{!play ? <StartGame /> : <Game />}</main>;
}

export default App;
