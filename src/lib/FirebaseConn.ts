import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIRESTORE_API_KEY as any);

admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });

const firestore = admin.firestore();

export { firestore };
