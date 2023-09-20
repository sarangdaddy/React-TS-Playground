import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const goHomeClick = () => {
    navigate('');
  };

  const goAboutClick = () => {
    navigate('/about');
  };

  return (
    <ul>
      <li>
        <button onClick={goHomeClick}>Home</button>
      </li>
      <li>
        <button onClick={goAboutClick}>About</button>
      </li>
    </ul>
  );
};
