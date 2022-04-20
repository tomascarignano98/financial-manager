import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export function useQuery(collectionName) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  // fetch the data
  useEffect(() => {
    const ref = collection(db, collectionName);
    const q = query(
      ref,
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (querySnapshot.empty) return setDocuments([]);

        const results = [];
        querySnapshot.forEach((doc) =>
          results.push({ ...doc.data(), id: doc.id })
        );

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('could not fetch the data');
      }
    );

    return () => unsubscribe();
  }, [collectionName, user.uid]);

  return { documents, error };
}
