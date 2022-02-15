import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  async function signup(email, password, displayName) {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) throw new Error('Could not complete signup');

      await updateProfile(response.user, { displayName });
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

  return { signup, error, isPending };
}
