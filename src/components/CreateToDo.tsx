import { toDoState } from '@/atoms';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      ...prevToDos,
      { text: toDo, id: Date.now(), category: 'TO_DO' },
    ]);
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="Write a To do"
      />
      <button>가자!</button>
    </form>
  );
};

export default CreateToDo;
