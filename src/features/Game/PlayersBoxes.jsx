import { useGameSettings } from '../../GameSettings';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './../../styles/PlayersBoxes.module.scss';
import { useState, useRef } from 'react';

function PlayersBoxes({ score, activePlayer, names, setNames }) {
  const less768px = useMediaQuery('min-width', '768px');

  const { players } = useGameSettings();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [playerNumber, setPlayerNumber] = useState(null);
  const label = useRef(null);
  const input = useRef(null);

  const toggleModal = (event = false) => {
    if (event) setPlayerNumber(+event.target.dataset.player);
    if (!event) setPlayerNumber(null);

    setIsOpen((prev) => !prev);
    setName('');

    setTimeout(() => {
      if (input.current) input.current.focus();
    }, 1);
  };

  const handlePlayerName = (event) => {
    if (event.key !== 'Enter' && event.type === 'keydown') return;

    if (!name) {
      label.current.textContent = 'Empty Field';
      return;
    }

    if (name.length > 10) {
      label.current.textContent = 'Max 10 characters';
      return;
    }

    setNames((prev) => {
      const arr = [...prev];
      arr[playerNumber - 1] = name;
      return arr;
    });

    toggleModal();
    setName('');
  };

  return (
    <section className={styles.section}>
      {isOpen && (
        <div className={styles.modal}>
          <span className={styles.overlay} onClick={toggleModal}></span>
          <div className={styles.form}>
            <div>
              <input
                ref={input}
                type="text"
                id="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                onKeyDown={handlePlayerName}
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="name" ref={label}>
                Insert Player Name
              </label>
            </div>
            <button className={styles.submit} onClick={handlePlayerName}>
              Submit
            </button>
            <button className={styles.close} onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        {Array.from({ length: players }, (_, i) => i + 1).map((player, i) => {
          return (
            <div
              key={player}
              data-player={player}
              className={`${styles.box} ${activePlayer == player ? styles.active : ''}`}
              onClick={toggleModal}
            >
              {(!names[i] || !less768px) && <p>{less768px ? `Player ${player}` : `P${player}`}</p>}
              {names[i] && less768px && <p>{names[i]}</p>}
              <p>{score[player - 1]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlayersBoxes;
