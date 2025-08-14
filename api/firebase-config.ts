// api/firebase-config.ts
export default function handler(req: any, res: any) {
  const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
  } = process.env;

  if (!FIREBASE_API_KEY || !FIREBASE_AUTH_DOMAIN || !FIREBASE_PROJECT_ID || !FIREBASE_APP_ID) {
    res.status(500).json({ error: 'Missing Firebase envs' });
    return;
  }

  // cache a peremhálózaton 10 percig
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600');

  res.status(200).json({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET ?? undefined,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID ?? undefined,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID ?? undefined,
  });
}
