export const environment = {
  production: true,
  baseUrl: '/',
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

  debugging: false,

  authConfig: {
    issuer: 'https://localhost:44392',
    redirectUri: 'http://localhost:4200',
    clientId: 'DonateTo.WebAplication',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    postLogoutRedirectUri: 'http://localhost:4200',
  },
};
