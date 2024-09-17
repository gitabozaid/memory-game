import styles from './../../styles/Header.module.scss';
import { useGameSettings } from '../../GameSettings';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState } from 'react';

function Header({ restart }) {
  const { setPlay } = useGameSettings();

  const match = useMediaQuery('min-width', '768px');

  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen((prev) => !prev);
  };

  const handleNewGame = () => {
    setPlay(false);
  };

  const handleRestart = () => {
    restart();
    if (match) toggleNav();
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo_wrapper}>
          <img src="logo.svg" alt="Memory Logo" />
        </div>
        <button className={styles.menu_btn} onClick={toggleNav}>
          Menu
        </button>

        {(navIsOpen || match) && (
          <>
            <div className={styles.layout}></div>
            <nav className={styles.nav}>
              <ul>
                <li>
                  <button className={`${styles.btn} ${styles.btn_restart}`} onClick={handleRestart}>
                    Restart
                  </button>
                </li>
                <li>
                  <button className={styles.btn} onClick={handleNewGame}>
                    New Game
                  </button>
                </li>
                <li>
                  <button className={styles.btn} onClick={toggleNav}>
                    Resume Game
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
