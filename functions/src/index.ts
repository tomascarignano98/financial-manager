import * as functions from 'firebase-functions';

('use strict');

export const cleanupReviews = functions.firestore
  .document('transactions/{transactionId}')
  .onWrite((change, context) => {
    const data = change.after.data();

    if (data) {
      const name = data.name;
      const updatedName = sanitizeForYourProtection(name);
      if (updatedName !== name) return null;
      return change.after.ref.update({ name: updatedName });
    } else {
      return null;
    }
  });

function sanitizeForYourProtection(text: string) {
  return text.replace(/fat\-free/gi, '');
}
