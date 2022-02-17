import { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };

    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authIsReady: false,
  });

  // Check ONCE if user is logged in when the app first renders
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      dispatch({ type: 'AUTH_IS_READY', payload: user })
    );
    unsub();

    // unnecessary but just in case unsub() doesn't execute for some reason
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
