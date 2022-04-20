import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

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

      // safely update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  }

  // Prevent state from being updated on unmount with cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
}

/* 
We'll still get the user in the global state, that's absolutely fine,
so we're still technically signing up, but now we don't get the "can't perform a 
React state update on an unmounted component. It indicates a leak in your app." error.
The cleanup function sets isCancelled to true, and when that's true we don't try to 
update state in our component.

*/
