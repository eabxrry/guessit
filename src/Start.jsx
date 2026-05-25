import React, { useMemo, useState } from 'react';
import { Gauge, Play, SlidersHorizontal, Timer } from 'lucide-react';
import Game from './Game.jsx';
import {
  DEFAULT_INTERVAL,
  DEFAULT_LEVEL,
  INTERVALS,
  LEVELS,
  getLevelConfig,
  getTurnsLabel,
} from './gameConfig.js';
import './Start.css';

function getStoredLevel() {
  const storedLevel = localStorage.getItem('level');
  return LEVELS.some((level) => level.key === storedLevel) ? storedLevel : DEFAULT_LEVEL;
}

function MenuScreen({ level, interval, onLevelChange, onIntervalChange, onLaunch }) {
  const currentLevel = useMemo(() => getLevelConfig(level), [level]);

  return (
    <div className="container">
      <h1 className="appTopName">Guess The Number</h1>
      <div className="interface start">
        <div className="containerCard">
          <div className="card">
            <div className="cardHeader">
              <p className="sectionKicker">Menu</p>
            </div>

            <section className="levelCont sectionBox">
              <div className="levelHead">
                <h2>
                  <Gauge size={16} className="labelIcon" /> Level{' '}
                  <span className={currentLevel.tone}>{currentLevel.label}</span>
                </h2>
                <h2 className="turn">
                  <Timer size={16} className="labelIcon" /> Turns{' '}
                  <span className={currentLevel.tone}>{getTurnsLabel(currentLevel.turns)}</span>
                </h2>
              </div>

              <div className="levelBtn">
                {LEVELS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    className={level === key ? 'active' : undefined}
                    onClick={() => onLevelChange(key)}
                    type="button"
                  >
                    <Icon size={16} /> {label}
                  </button>
                ))}
              </div>
            </section>

            <section className="intervalCont sectionBox">
              <div className="intervalHead">
                <h2>
                  <SlidersHorizontal size={16} className="labelIcon" /> Interval
                </h2>
                <span>{interval}</span>
              </div>
              <div className="intervalBtn">
                {INTERVALS.map((value) => (
                  <button
                    key={value}
                    className={interval === value ? 'active' : undefined}
                    onClick={() => onIntervalChange(value)}
                    type="button"
                  >
                    1 - {value}
                  </button>
                ))}
              </div>
            </section>

            <div className="contButton">
              <button onClick={onLaunch} type="button">
                <Play size={16} /> Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="appFooter">
        Made with passion by{' '}
        <a href="http://eabarry.dev" target="_blank" rel="noopener noreferrer">
          eabarry
        </a>
      </footer>
    </div>
  );
}

export default function Start() {
  const [level, setLevel] = useState(getStoredLevel);
  const [interval, setIntervalValue] = useState(DEFAULT_INTERVAL);
  const [showGame, setShowGame] = useState(false);

  const handleLevelChange = (nextLevel) => {
    localStorage.setItem('level', nextLevel);
    setLevel(nextLevel);
  };

  if (showGame) {
    return <Game level={level} interval={interval} onBackToMenu={() => setShowGame(false)} />;
  }

  return (
    <MenuScreen
      level={level}
      interval={interval}
      onLevelChange={handleLevelChange}
      onIntervalChange={setIntervalValue}
      onLaunch={() => setShowGame(true)}
    />
  );
}
