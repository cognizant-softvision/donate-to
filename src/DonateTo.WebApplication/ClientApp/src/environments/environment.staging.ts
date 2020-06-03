export const environment = {
  production: false,
  baseUrl: 'https://localhost:44328',
  paths: {
    imagesRoot: '/src/assets/images/',
  },

  localization: {
    languages: [
      {
        code: 'en',
        name: 'EN',
        culture: 'en-EN',
      },
    ],
    defaultLanguage: 'en',
  },

  debugging: true,

  authConfig: {
    issuer: 'https://localhost:44392',
    redirectUri: 'http://localhost:4200',
    clientId: 'DonateTo.WebAplication',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    clearHashAfterLogin: true,
    nonceStateSeparator: 'semicolon',
  },
};
