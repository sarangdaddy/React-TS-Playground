import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '@/atoms';

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCateGory: IToDo['category']) => {
    setToDos((prevToDos) => {
      if (newCateGory === Categories.DEL) {
        return prevToDos.filter((toDo) => toDo.id !== id);
      }

      return prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: newCateGory } : toDo,
      );
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category == Categories.TOGO && (
        <>
          <button onClick={() => onClick(Categories.BEEN)}>BEEN</button>
          <button onClick={() => onClick(Categories.DEL)}>DEL</button>
        </>
      )}
      {category == Categories.BEEN && (
        <>
          <button onClick={() => onClick(Categories.TOGO)}>TOGO</button>
          <button onClick={() => onClick(Categories.LIKE)}>LIKE</button>
        </>
      )}
      {category == Categories.LIKE && (
        <button onClick={() => onClick(Categories.BEEN)}>UNLIKE</button>
      )}
    </li>
  );
};

export default ToDo;
