import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toDoListFilterState, toDoListState } from '@/atoms';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDoList = useSetRecoilState(toDoListState);
  const filterKey = useRecoilValue(toDoListFilterState);
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDoList((prevToDos) => [
      ...prevToDos,
      { text: toDo, id: Date.now(), filterKey },
    ]);
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="나라 이름"
      />
      <button>가자!</button>
      <span>{formState.errors.toDo?.message}</span>
    </form>
  );
};

export default CreateToDo;
