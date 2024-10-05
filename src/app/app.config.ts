import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-7c185',
        appId: '1:912167209582:web:217876c5a366f3c6d7347f',
        storageBucket: 'simple-crm-7c185.appspot.com',
        apiKey: 'AIzaSyBPZzwvOHuQDeaIJNvcnAk2hA5lacG52eM',
        authDomain: 'simple-crm-7c185.firebaseapp.com',
        messagingSenderId: '912167209582',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
