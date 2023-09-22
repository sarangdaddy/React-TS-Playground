import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface BookType {
  key: number;
  title: string;
  contents: { type: string; items: string[] }[];
}

interface BookContext {
  book: BookType;
}

interface ContentsType {
  type: string;
  items: string[];
}

export const Book = () => {
  const book = useOutletContext<BookContext>();
  const contents = book?.book?.contents;
  const [selectedType, setSelectedType] = useState<ContentsType | null>(null);

  return (
    <>
      <h2>{book?.book?.title}</h2>
      <hr />
      <ul>
        {contents?.map((content, index) => (
          <li key={index}>
            <Link to={content.type} onClick={() => setSelectedType(content)}>
              {content.type}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet context={{ type: selectedType }} />
    </>
  );
};
