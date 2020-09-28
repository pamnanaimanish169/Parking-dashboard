// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleApiUrl: 'https://maps.googleapis.com/maps/api/geocode/',
  googleApiKey: 'AIzaSyAsW6UNC-i1gSxVtN1olayunOPSOEwrxpw',
  firebaseApiUrl: 'https://the-parking-company.firebaseio.com/rest/saving-data/',
  firebaseApiKey: 'omD1UyiTCwRWmHqdvBpzv8iVViJK6571qIguOVt5',
  firebase: {
   apiKey: "AIzaSyDObTkqBCoXuXZPuOzPRURgGP-v4bGfacw",
   authDomain: "the-parking-company.firebaseapp.com",
   databaseURL: "https://the-parking-company.firebaseio.com",
   projectId: "the-parking-company",
   storageBucket: "the-parking-company.appspot.com",
   messagingSenderId: "456236210014",
   appId: "1:456236210014:web:60d5b2c9a7dc63fdb021cf",
   measurementId: "G-C389G6S95L"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
