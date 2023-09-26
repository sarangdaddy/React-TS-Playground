import { atom, selector } from 'recoil';

export enum Categories {
  'TOGO' = 'TOGO',
  'BEEN' = 'BEEN',
  'LIKE' = 'LIKE',
  'DEL' = 'DEL',
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TOGO,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: JSON.parse(localStorage.getItem('toDos') || '[]'),
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);

    return [
      toDos.filter((toDo) => toDo.category === Categories.TOGO),
      toDos.filter((toDo) => toDo.category === Categories.BEEN),
      toDos.filter((toDo) => toDo.category === Categories.LIKE),
    ];
  },
});
