// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    apiServerURL: "http://api-ekindb-review.havanaclub.cu",
    keycloak: {
        authority: 'http://authenticator.havanaclub.cu',
        redirectUri: 'http://ekindb-review.havanaclub.cu',
        postLogoutRedirectUri: 'http://ekindb-review.havanaclub.cu/logout',
        realm: 'prod-env',
        clientId: 'ekindb-review-api-rest',
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
