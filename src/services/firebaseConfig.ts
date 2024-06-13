import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCWlraPZd6qmyNkqc21wH_ijRcpgGVceNM',
  authDomain: 'testexamplefirebase-4d80c.firebaseapp.com',
  projectId: 'testexamplefirebase-4d80c',
  storageBucket: 'testexamplefirebase-4d80c.appspot.com',
  messagingSenderId: '818460555056',
  appId: '1:818460555056:web:3bffdf06e093dc4381baf5',
  measurementId: 'G-LHE63JLL49',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
