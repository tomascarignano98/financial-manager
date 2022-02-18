import { useReducer, useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { db } from '../firebase/config';
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';

export function useFirestore(collectionName) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuthContext();
  const collectionRef = collection(db, collectionName);

  async function addDocument(docData) {
    dispatch({ type: 'IS_PENDING' });

    try {
      const doc = {
        ...docData,
        createdAt: Timestamp.now(),
        uid: user.uid,
      };
      const addedDocRef = await addDoc(collectionRef, doc);

      if (addedDocRef) dispatchIfMounted({ type: 'ADDED', payload: doc });
    } catch (error) {
      dispatchIfMounted({ type: 'ERROR', payload: error.message });
    }
  }

  function deleteDocument(id) {
    deleteDoc(getDoc(id));
  }

  // safely update state
  function dispatchIfMounted(action) {
    if (isMounted) dispatch(action);
  }

  // cancel any local state updates if component will unmount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return { addDocument, deleteDocument, response: state };
}

// ----------------------------------------------
const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        error: null,
      };

    case 'ADDED':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };

    case 'ERROR':
      console.log('error in useFirestore!');
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
}
