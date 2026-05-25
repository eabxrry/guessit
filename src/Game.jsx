import React, { useCallback, useMemo, useState } from 'react';
import { Check, Gauge, House, Info, RotateCcw, Timer } from 'lucide-react';
import { getLevelConfig, getTurnsLabel, pickRandomNumber } from './gameConfig.js';
import './Game.css';

const STATUS = {
  idle: 'idle',
  higher: 'higher',
  lower: 'lower',
  win: 'win',
  lose: 'lose',
  invalid: 'invalid',
};

const STATUS_MESSAGES = {
  [STATUS.higher]: 'Plus',
  [STATUS.lower]: 'Moins',
  [STATUS.win]: 'Vous avez gagne !',
  [STATUS.lose]: 'Vous avez perdu',
  [STATUS.invalid]: 'Entrez un nombre valide dans l intervalle',
  [STATUS.idle]: 'Faites votre premiere tentative',
};

function GuessForm({ value, onChange, onSubmit, disabled, interval }) {
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="formGuess">
        <input
          type="number"
          min="1"
          max={interval}
          step="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input"
          inputMode="numeric"
          aria-label="Votre proposition"
          placeholder={`Entrez un nombre entre 1 et ${interval}`}
          disabled={disabled}
        />
        <button className="btnGuess" type="submit" disabled={disabled} aria-label="Valider">
          <Check size={18} />
        </button>
      </div>
    </form>
  );
}

export default function Game({ level, interval, onBackToMenu }) {
  const levelConfig = useMemo(() => getLevelConfig(level), [level]);
  const hasLimitedTurns = Number.isFinite(levelConfig.turns);

  const [guessValue, setGuessValue] = useState('');
  const [number, setNumber] = useState(() => pickRandomNumber(interval));
  const [status, setStatus] = useState(STATUS.idle);
  const [turnsLeft, setTurnsLeft] = useState(levelConfig.turns);

  const resetGame = useCallback(() => {
    setNumber(pickRandomNumber(interval));
    setTurnsLeft(levelConfig.turns);
    setStatus(STATUS.idle);
    setGuessValue('');
  }, [interval, levelConfig.turns]);

  React.useEffect(() => {
    resetGame();
  }, [resetGame]);

  const isGameOver = status === STATUS.win || status === STATUS.lose;
  const hasTurnsLeft = !hasLimitedTurns || turnsLeft > 0;
  const isInputDisabled = isGameOver || !hasTurnsLeft;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInputDisabled) return;

    const parsed = Number.parseInt(guessValue, 10);
    const isValid = Number.isInteger(parsed) && parsed >= 1 && parsed <= interval;

    if (!isValid) {
      setStatus(STATUS.invalid);
      return;
    }

    const nextTurns = hasLimitedTurns ? turnsLeft - 1 : turnsLeft;
    if (hasLimitedTurns) setTurnsLeft(nextTurns);

    if (parsed === number) {
      setStatus(STATUS.win);
      return;
    }

    if (hasLimitedTurns && nextTurns <= 0) {
      setStatus(STATUS.lose);
      return;
    }

    setStatus(parsed < number ? STATUS.higher : STATUS.lower);
  };

  return (
    <div className="container">
      <h1 className="appTopName">Guess The Number</h1>
      <div className="interface board">
        <div className="containerCard">
          <div className={status === STATUS.win ? 'cardWin card' : status === STATUS.lose ? 'cardLose card' : 'card'}>
            <section className="gameHead sectionBox">
              <h2 className="levelGame">
                <Gauge size={16} className="labelIcon" /> Level <span className={levelConfig.tone}>{levelConfig.label}</span>
              </h2>
              <h2>
                <Timer size={16} className="labelIcon" /> Turns{' '}
                <span className={hasLimitedTurns && turnsLeft <= 3 ? 'red' : levelConfig.tone}>{getTurnsLabel(turnsLeft)}</span>
              </h2>
            </section>

            <section className="betweenLevel sectionBox">
              <h1 className="intervalGame">
                <span>1</span> &lt;{' '}
                <span id={status === STATUS.win ? 'winnumber' : status === STATUS.lose ? 'losenumber' : undefined}>
                  {isGameOver ? number : '?'}
                </span>{' '}
                &lt; <span>{interval}</span>
              </h1>
            </section>

            <section className="lessEqualUpper sectionBox">
              <span>
                <Info size={16} className="labelIcon" />
                <span className="info" id={status === STATUS.win ? 'win' : status === STATUS.lose ? 'lose' : undefined}>
                  {STATUS_MESSAGES[status]}
                </span>
              </span>
            </section>

            <GuessForm
              value={guessValue}
              onChange={setGuessValue}
              onSubmit={handleSubmit}
              disabled={isInputDisabled}
              interval={interval}
            />

            <div className="actionRow">
              <button className="actionBtn" onClick={onBackToMenu} type="button">
                <House size={16} /> Menu
              </button>
              <button className="actionBtn" onClick={resetGame} type="button" aria-label="Relancer une partie">
                <RotateCcw size={16} />
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
