// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_WEFOX: 'http://localhost:3000/api/v1/posts',
  MAPBOX_TOKEN:
    'pk.eyJ1IjoiZW5yaXF1ZWdmIiwiYSI6ImNrbXh1ZTRuYzBzZ2Yydm16cW5sdDNsbHcifQ.eGZKo262uA2zKMo-t2Cp0g',
  MAPBOX_STATIC_MAP_IMAGE:
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/',
  REVERSE_GEOCODING:
    'https://api.bigdatacloud.net/data/reverse-geocode?',
  REVERSE_GEO_API_KEY: '93f8cbec828f40cfafdbaf8de900c92b',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
