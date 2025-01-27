
import { initializeApp } from 'firebase/app';

import { getFirebaseConfig } from './config';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(getFirebaseConfig());
export const db = getFirestore(app);
