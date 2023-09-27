import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toDoSelector, toDoListState } from '@/atoms';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';

export default function ToDoList() {
  const toDoList = useRecoilValue(toDoListState);
  const [toGo, been, like] = useRecoilValue(toDoSelector);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <main>
      <br />
      <h2>내가 가고싶은 나라들</h2>
      <br />
      <CreateToDo />
      <ul>{toGo?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      <br />
      <hr />
      <h2>내가 가본 나라들</h2>
      <ul>{been?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      <br />
      <hr />
      <h2>내가 좋아하는 나라들</h2>
      <ul>{like?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
    </main>
  );
}
