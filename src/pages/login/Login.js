import { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setEmail('');
    setPassword('');
    console.log({ email, password });
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
      <button className="btn">Login</button>
    </form>
  );
}
