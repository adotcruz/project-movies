// tslint:disable-next-line: no-submodule-imports
import 'module-alias/register';

import dotenv from 'dotenv';
import minimist from 'minimist';

import { MovieController } from '@controllers/MovieController';

import { App } from './app';
import { TestController } from './controllers';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase';

dotenv.config();
const processArguments: any = minimist(process.argv);

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get reference to the Database Service
const database = firebase.database();

// tslint:disable-next-line: no-string-literal
const isDev = processArguments['dev'];

if (isDev) {
  console.log('******* Running Development Server****');
}

const app = new App(
  [new MovieController(database), new TestController()],
  3030,
  isDev
);

app.listen();
