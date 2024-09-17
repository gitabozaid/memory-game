import styles from './../../styles/Dots.module.scss';
import { useEffect, useState } from 'react';
import { useImperativeHandle, forwardRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Dots = forwardRef((props, ref) => {
  const { grid, gridSize, setMoves, setGameOver, score, setScore, activePlayer, setActivePlayer, players } = props;

  const match = useMediaQuery('min-width', '768px');

  const [guessedTiles, setGuessedTiles] = useState(Array.from({ length: grid.length }, () => false));

  const [tile1, setTile1] = useState(undefined);
  const [tile2, setTile2] = useState(undefined);

  function resetTiles() {
    setTile1(undefined);
    setTile2(undefined);
  }

  function handleDotClick(target) {
    if (guessedTiles.every((tile) => tile)) return;

    const tile = target.dataset.tile;

    if (!tile1) {
      setTile1(tile);
      setMoves((prev) => prev + 1);
      return;
    }

    if (!tile2) {
      setTile2(tile);
      setMoves((prev) => prev + 1);
      return;
    }
  }

  useEffect(() => {
    if (tile1 && tile2 && grid[+tile1] !== grid[+tile2]) {
      setTimeout(() => {
        resetTiles();

        if (+players > 1) {
          setActivePlayer((prev) => {
            if (prev < score.length) return prev + 1;
            if (prev === score.length) return 1;
          });
        }
      }, 700);
    }

    if (tile1 && tile2 && grid[+tile1] === grid[+tile2]) {
      setTimeout(() => {
        setGuessedTiles((prev) => {
          const arr = [...prev];
          arr[+tile1] = true;
          arr[+tile2] = true;
          return arr;
        });

        resetTiles();

        if (+players > 1) {
          setScore((prev) => {
            const arr = [...prev];
            arr[activePlayer - 1] = arr[activePlayer - 1] + 1;
            return arr;
          });
        }
      }, 500);
    }

    setTimeout(() => {
      if (guessedTiles.every((tile) => tile)) gameOver();
    }, 1000);
  }, [tile1, tile2]);

  function gameOver() {
    setGameOver(true);
  }

  const gridStyles = {
    gridTemplateColumns: `repeat(${+gridSize === 4 ? '4, minmax(0, 118px)' : '6, minmax(0, 82px)'})`,
    gridTemplateRows: `repeat(${+gridSize === 4 ? '4, minmax(0, 118px)' : '6, minmax(0, 82px)'})`,
    gap: `${match ? (+gridSize === 4 ? '20px' : '16px') : +gridSize === 4 ? '12.3px' : '9.1px'}`,
  };

  useImperativeHandle(ref, () => ({
    resetGrid() {
      setGuessedTiles(Array.from({ length: grid.length }, () => false));
      setTile1(undefined);
      setTile2(undefined);
    },
  }));

  return (
    <div className={`${styles.wrapper}`} style={{ width: `${match ? (+gridSize === 4 ? '532px' : '572px') : ''}` }}>
      <ul className={styles.ul} style={gridStyles}>
        {grid.map((dot, i) => {
          return (
            <li
              key={i}
              data-tile={i}
              className={`${+tile1 === i || +tile2 === i || guessedTiles[i] ? styles.active : ''} ${
                +gridSize === 4 ? styles.grid_4 : styles.grid_6
              }`}
              onClick={({ target }) => {
                if (+tile1 === i || +tile2 === i || guessedTiles[i]) return;
                handleDotClick(target);
              }}
            >
              <span className={`${styles.front}`}></span>
              <span className={`${styles.back} ${guessedTiles[i] ? styles.guessed : ''}`}>
                {+tile1 === i && dot}
                {+tile2 === i && dot}
                {guessedTiles[i] && dot}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Dots;
