import { useSetRecoilState } from 'recoil';
import { FilterKeys, IToDo, toDoListState } from '@/atoms';

const ToDo = ({ text, filterKey, id }: IToDo) => {
  const setToDoList = useSetRecoilState(toDoListState);

  const onClick = (setFilterKey: IToDo['filterKey']) => {
    setToDoList((prevToDos) => {
      if (setFilterKey === FilterKeys.DEL) {
        return prevToDos.filter((toDo) => toDo.id !== id);
      }

      return prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, filterKey: setFilterKey } : toDo,
      );
    });
  };

  return (
    <li>
      <span>{text}</span>
      {filterKey == FilterKeys.TOGO && (
        <>
          <button onClick={() => onClick(FilterKeys.BEEN)}>BEEN</button>
          <button onClick={() => onClick(FilterKeys.DEL)}>DEL</button>
        </>
      )}
      {filterKey == FilterKeys.BEEN && (
        <>
          <button onClick={() => onClick(FilterKeys.TOGO)}>TOGO</button>
          <button onClick={() => onClick(FilterKeys.LIKE)}>LIKE</button>
        </>
      )}
      {filterKey == FilterKeys.LIKE && (
        <button onClick={() => onClick(FilterKeys.BEEN)}>UNLIKE</button>
      )}
    </li>
  );
};

export default ToDo;
