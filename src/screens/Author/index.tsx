import { Link, Outlet, useParams } from 'react-router-dom';
import { authors } from '@/db';
import { useState } from 'react';

interface BookType {
  key: number;
  title: string;
  contents: { type: string; items: string[] }[];
}

export const Author = () => {
  const { authorName } = useParams();
  const author = authors.find((author) => author.name === authorName);
  const books = author?.books;

  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  return (
    <>
      <h1>{authorName}</h1>
      <hr />
      <ul>
        {books?.map((book) => (
          <li key={book.key}>
            <Link to={book.title} onClick={() => setSelectedBook(book)}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet context={{ book: selectedBook }} />
    </>
  );
};
