import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    setEmail('');
    setPassword('');
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h1>Login</h1>
      <label>
        <span>email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {isPending ? (
        <button className="btn" disabled>
          loading...
        </button>
      ) : (
        <button className="btn">Signup</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
