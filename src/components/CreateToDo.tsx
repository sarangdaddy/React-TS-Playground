import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '@/atoms';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      ...prevToDos,
      { text: toDo, id: Date.now(), category: category },
    ]);
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="이름"
      />
      <button>가자!</button>
      <span>{formState.errors.toDo?.message}</span>
    </form>
  );
};

export default CreateToDo;
