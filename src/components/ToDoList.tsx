import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toDoSelector, toDoState } from '@/atoms';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const [toGo, been, like] = useRecoilValue(toDoSelector);

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <hr />
      <CreateToDo />
      <ul>{toGo?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      <h2>내가 가본 나라들</h2>
      <ul>{been?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      <h2>내가 좋아하는 나라들</h2>
      <ul>{like?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
    </main>
  );
}
