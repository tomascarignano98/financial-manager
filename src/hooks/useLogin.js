import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export function useLogin() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setError(null);
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: 'LOGIN', payload: response.user });

      // update state
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  }

  // Cleanup functionality
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
}
