import { useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { toDoState } from '@/atoms';

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </main>
  );
}
