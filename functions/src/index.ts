import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';

('use strict');

export const cleanupReviews = functions.firestore
  .document('transactions/{transactionId}')
  .onUpdate((change, context) => {
    const db = getFirestore();
    const batch = db.batch();

    if (change.before.data().name !== change.after.data().name) {
      db.collection('transactions')
        .where('uid', '==', context.auth?.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((docSnapshot) =>
            batch.update(docSnapshot.ref, { name: 'tomas' })
          );
        });

      batch.commit();
    }
  });
