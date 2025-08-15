import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _config: any | null = null;

async function loadConfig() {
  if (_config) return _config;
  try {
    const res = await fetch('/api/firebase-config', { credentials: 'same-origin' });
    if (res.ok) {
      _config = await res.json();
      return _config;
    }
  } catch {}
  // DEV fallback: read from Vite env variables
  _config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
  if (!_config.apiKey) throw new Error('Firebase config missing (API route and env fallback failed)');
  return _config;
}

export async function getFirebase() {
  if (!_app) {
    const config = await loadConfig();
    _app = getApps().length ? getApps()[0] : initializeApp(config);
    _auth = getAuth(_app);
    _db = getFirestore(_app);
  }
  return { app: _app!, auth: _auth!, db: _db! };
}
