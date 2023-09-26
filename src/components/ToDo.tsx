import { IToDo } from '@/atoms';

const ToDo = ({ ...props }: IToDo) => {
  return <li>{props.text}</li>;
};

export default ToDo;
