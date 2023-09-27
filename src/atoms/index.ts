import { atom, selector } from 'recoil';

export enum FilterKeys {
  'TOGO' = 'TOGO',
  'BEEN' = 'BEEN',
  'LIKE' = 'LIKE',
  'DEL' = 'DEL',
}

export interface IToDo {
  id: number;
  text: string;
  filterKey: FilterKeys;
}

export const toDoListState = atom<IToDo[]>({
  key: 'toDoListState',
  default: JSON.parse(localStorage.getItem('toDoList') || '[]'),
});

export const toDoListFilterState = atom<FilterKeys>({
  key: 'toDoListFilterState',
  default: FilterKeys.TOGO,
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoListState);

    return [
      toDos.filter((toDo) => toDo.filterKey === FilterKeys.TOGO),
      toDos.filter((toDo) => toDo.filterKey === FilterKeys.BEEN),
      toDos.filter((toDo) => toDo.filterKey === FilterKeys.LIKE),
    ];
  },
});
