import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
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

      updateProfile(response.user, { displayName });
      dispatch({ type: 'LOGIN', payload: response.user });
      setIsPending(false);
      navigate('/');
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  }

  return { signup, error, isPending };
}
