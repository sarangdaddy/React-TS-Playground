import { authors } from '@/db';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/author/${author.name}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
