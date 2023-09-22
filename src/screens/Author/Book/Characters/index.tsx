import { useOutletContext } from 'react-router-dom';

interface ContentsType {
  type: string;
  items: string[];
}

interface ContentsContext {
  type: ContentsType;
}

export const Characters = () => {
  const ctx = useOutletContext<ContentsContext>();
  const items = ctx?.type?.items;

  return (
    <>
      <h3>Characters</h3>
      <ul>{items?.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </>
  );
};
