import { useReducer, useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { db } from '../firebase/config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

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

    case 'DELETED':
      return {
        document: null,
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

export function useFirestore(collectionName) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuthContext();

  const collectionRef = collection(db, collectionName);

  // add a document
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

  // delete a document
  async function deleteDocument(id) {
    dispatch({ type: 'IS_PENDING' });

    try {
      await deleteDoc(doc(db, collectionName, id));
      dispatchIfMounted({ type: 'DELETED' });
    } catch (error) {
      dispatchIfMounted({ type: 'ERROR', payload: error.message });
    }
  }

  // cancel any local state updates if component will unmount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // safely update state
  function dispatchIfMounted(action) {
    if (isMounted) dispatch(action);
  }

  return { addDocument, deleteDocument, response: state };
}
