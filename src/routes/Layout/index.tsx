import { Outlet } from 'react-router-dom';

interface IOutletContext {
  isDark: boolean;
  toggleDark: () => void;
}

const Layout = ({ isDark, toggleDark }: IOutletContext) => {
  return (
    <>
      <Outlet context={{ isDark, toggleDark }} />
    </>
  );
};

export default Layout;
