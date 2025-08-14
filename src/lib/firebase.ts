import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

async function loadConfig() {
  const res = await fetch('/api/firebase-config', { credentials: 'same-origin' });
  if (!res.ok) throw new Error('Failed to load Firebase config');
  return await res.json();
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
