import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
import { auth } from '../firebase/config';

export function useLogout() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  function logout() {
    setError(null);

    signOut(auth)
      .then((res) => dispatch({ type: 'LOGOUT' }))
      .catch((error) => setError(error.message));
  }

  return { logout, error };
}
