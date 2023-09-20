import { useOutletContext } from 'react-router-dom';

interface contentsType {
  type: string;
  items: string[];
}

interface ContentsContext {
  type: contentsType;
}

export const Chapters = () => {
  const ctx = useOutletContext<ContentsContext>();
  const items = ctx?.type?.items;

  return (
    <>
      <h3>Chapters</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};
