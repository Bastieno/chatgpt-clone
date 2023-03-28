import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDVUorTm0fVGzvzbus8cVXzG5yvOjuvz30',
  authDomain: 'chatgtp-clone.firebaseapp.com',
  projectId: 'chatgtp-clone',
  storageBucket: 'chatgtp-clone.appspot.com',
  messagingSenderId: '151176546306',
  appId: '1:151176546306:web:c5e3c28a6daf5227567f1b',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
