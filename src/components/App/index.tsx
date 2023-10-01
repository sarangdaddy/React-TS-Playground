import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { InitialValues, goalState, roundState, timeState } from '@/atoms';

import * as S from './styled';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [time, setTime] = useRecoilState(timeState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);
  const [isOnStart, setIsOnStart] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const min = Math.floor(time / 60);
  const sec = time % 60;

  const handleStart = () => {
    setIsOnStart((prev) => !prev);

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
    if (time === 0) {
      setTime(InitialValues.TIME);
      setRound((prev) => prev + 1);
    }
  }, [time]);

  useEffect(() => {
    if (round === InitialValues.MAX_ROUND) {
      setGoal((prev) => prev + 1);
      setRound(InitialValues.ROUND);
    }
  }, [round]);

  useEffect(() => {
    if (goal === InitialValues.MAX_GOAL) {
      setTime(InitialValues.TIME);
      setRound(InitialValues.ROUND);
      setGoal(InitialValues.GOAL);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [goal]);

  return (
    <S.Wrapper>
      <S.Title>Pomodoro Timer</S.Title>
      <S.TimeBox>
        <AnimatePresence mode="wait">
          <S.Box
            key={min}
            variants={S.boxVariants}
            initial="initial"
            animate="visible"
          >
            {min.toString().padStart(2, '0')}
          </S.Box>
        </AnimatePresence>
        <span>:</span>
        <AnimatePresence mode="wait">
          <S.Box
            key={sec}
            variants={S.boxVariants}
            initial="initial"
            animate="visible"
          >
            {sec.toString().padStart(2, '0')}
          </S.Box>
        </AnimatePresence>
      </S.TimeBox>
      <S.BtnContainer>
        {!isOnStart ? (
          <S.BtnSvg
            variants={S.btnVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
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
          </S.BtnSvg>
        ) : (
          <S.BtnSvg
            variants={S.btnVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleStart}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="white"
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"
            />
          </S.BtnSvg>
        )}
      </S.BtnContainer>
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
