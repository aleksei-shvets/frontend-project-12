import useAuth from '../hooks/useAuth.js';

const Nav = () => {
  const authHook = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <button onClick={authHook.logOut()} type="button" className="btn btn-primary">Выйти</button>
      </div>
    </nav>
  );
};

export default Nav;
