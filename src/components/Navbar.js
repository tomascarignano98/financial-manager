import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, error } = useLogout();

  return (
    <nav className={styles.navbar} role="banner">
      <ul role="navigation">
        <li className={styles.title}>myMoney</li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>hi, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                {error || 'Logout'}
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
