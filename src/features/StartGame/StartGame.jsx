import styles from './../../styles/StartGame.module.scss';
import { useEffect } from 'react';
import { useGameSettings } from '../../GameSettings';
import SelectSetting from './SelectSetting';

const test = [
  { setting: 'theme', title: 'Select Theme', options: ['Numbers', 'Icons'] },
  { setting: 'players', title: 'Number of Players', options: ['1', '2', '3', '4'] },
  { setting: 'grid', title: 'Grid Size', options: ['4x4', '6x6'] },
  { setting: 'tiles', title: 'Tiles Shape', options: ['Circle', 'Squircle'] },
];

function StartGame() {
  const { setPlay } = useGameSettings();

  useEffect(() => {
    document.body.style.setProperty('background-color', '#152938');
    return () => document.body.style.setProperty('background-color', '#FCFCFC');
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <h1 className={styles.h1}>
          <img src="logo-white.svg" alt="Logo" />
          <span>Memory Game</span>
        </h1>
        <section className={styles.section}>
          <div className={styles.container}>
            {test.map(({ setting, title, options }) => {
              return <SelectSetting key={setting} setting={setting} title={title} options={options} />;
            })}
            <button onClick={() => setPlay(true)} className={styles.btn}>
              Start Game
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StartGame;
