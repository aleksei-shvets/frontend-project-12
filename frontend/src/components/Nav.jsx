import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const Nav = () => {
  const { t } = useTranslation();
  const authHook = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {
          authHook.username
            ? <button onClick={authHook.logOut} type="button" className="action btn bg-info">{t('buttons.logoutBtn')}</button>
            : null
        }
      </div>
    </nav>
  );
};

export default Nav;
