import { atom } from 'recoil';

export enum InitialValues {
  'TIME' = 1500, // 타이머 시간 세팅
  'ROUND' = 0,
  'GOAL' = 0,
  'MAX_ROUND' = 4,
  'MAX_GOAL' = 12,
}

export const timeState = atom({
  key: 'timeState',
  default: InitialValues.TIME,
});

export const roundState = atom({
  key: 'roundState',
  default: InitialValues.ROUND,
});

export const goalState = atom({
  key: 'goalState',
  default: InitialValues.GOAL,
});
