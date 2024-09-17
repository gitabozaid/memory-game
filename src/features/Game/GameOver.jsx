import { useGameSettings } from '../../GameSettings';
import styles from './../../styles/GameOver.module.scss';

function GameOver({ moves, time, restart, score, players, names }) {
  const { setPlay } = useGameSettings();

  const formattedTime = `${Math.trunc(time / 60)}:${String(time % 60).padStart(2, '0')}`;

  const winnerPoint = score.reduce((acc, point) => (acc > point ? acc : point), 0);

  const results = score
    .map((score, i) => {
      return { player: i + 1, name: names[i], score };
    })
    .sort((a, b) => b.score - a.score);

  const isTie =
    score.reduce((acc, point) => {
      if (point === winnerPoint) acc.push(point);
      return acc;
    }, []).length > 1;

  let winner;

  if (!isTie) {
    const playerNum = score.indexOf(winnerPoint) + 1;
    const playerName = names[playerNum - 1];

    if (playerName) winner = playerName;
    if (!playerName) winner = playerNum;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}></div>
        <div className={styles.wrapper}>
          <h1>
            {+players === 1
              ? 'You did it!'
              : isTie
              ? 'It’s a tie!'
              : `${typeof winner === 'number' ? 'Player' : ''} ${winner} Wins!`}
          </h1>
          <p className={styles.text}>
            {+players === 1 ? 'Game over! Here’s how you got on...' : 'Game over! Here are the results...'}
          </p>

          {+players === 1 && (
            <ul>
              <li>
                <p>Time Elapsed</p>
                <p>{formattedTime}</p>
              </li>

              <li>
                <p>Moves Taken</p>
                <p>{moves} Moves</p>
              </li>
            </ul>
          )}

          {+players > 1 && (
            <ul>
              {results.map((result, i) => {
                return (
                  <li key={i} className={result.score === winnerPoint ? styles.winner : ''}>
                    <p>
                      {!result.name && 'Player'} {!result.name && result.player}&nbsp;
                      {result.name && result.name}&nbsp;
                      {result.score === winnerPoint && '(Winner!)'}
                    </p>
                    <p>{result.score} Pairs</p>
                  </li>
                );
              })}
            </ul>
          )}

          <span className={styles.btns_wrapper}>
            <button className={styles.btn_restart} onClick={restart}>
              Restart
            </button>
            <button className={styles.btn_new_game} onClick={() => setPlay(false)}>
              Setup New Game
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}

export default GameOver;
