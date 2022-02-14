import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signup, isPending, error } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    signup(email, password, displayName);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h1>Signup</h1>
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
      <label>
        <span>display name</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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
