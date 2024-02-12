// import { Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.js';

const Nav = () => {
  const authHook = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {
          authHook.loggedIn
            ? <button onClick={authHook.logOut} type="button" className="action btn bg-info">Выйти</button>
            : null
        }
      </div>
    </nav>
  );
};

export default Nav;
