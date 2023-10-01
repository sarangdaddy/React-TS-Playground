import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { InitialValues, goalState, roundState, timeState } from '@/atoms';
import * as S from './styled';

function App() {
  const [time, setTime] = useRecoilState(timeState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const min = Math.floor(time / 60);
  const sec = time % 60;

  if (time === 0) {
    setRound((prev) => prev + 1);
    setTime(InitialValues.TIME);
  }

  if (round === InitialValues.MAX_ROUND) {
    setGoal((prev) => prev + 1);
    setRound(InitialValues.ROUND);
  }

  if (goal === InitialValues.MAX_GOAL) {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(InitialValues.TIME);
    setRound(InitialValues.ROUND);
    setGoal(InitialValues.GOAL);
  }

  const handleStart = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      const intervalId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      intervalRef.current = intervalId;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <S.Wrapper>
      <S.Title>Pomodoro Timer</S.Title>
      <S.TimeBox>
        <S.Box>{min.toString().padStart(2, '0')}</S.Box>
        <span>:</span>
        <S.Box>{sec.toString().padStart(2, '0')}</S.Box>
      </S.TimeBox>
      <S.PlayButton>
        <svg
          onClick={handleStart}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="white"
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
          />
        </svg>
      </S.PlayButton>
      <S.InfoBox>
        <div>
          <span>
            {round} / {InitialValues.MAX_ROUND}
          </span>
          <span>ROUND</span>
        </div>
        <div>
          <span>
            {goal} / {InitialValues.MAX_GOAL}
          </span>
          <span>GOAL</span>
        </div>
      </S.InfoBox>
    </S.Wrapper>
  );
}

export default App;
