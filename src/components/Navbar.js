import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logout, error } = useLogout();

  return (
    <nav className={styles.navbar} role="banner">
      <ul role="navigation">
        <li className={styles.title}>myMoney</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" onClick={logout}>
            {error || 'Logout'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
