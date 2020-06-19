export const environment = {
  production: true,
  baseUrl: 'https://donatedevwebapi.azurewebsites.net',
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
    issuer: 'https://donatedevidentity.azurewebsites.net',
    redirectUri: 'https://donatedevwebapp.azurewebsites.net',
    clientId: 'DonateTo.WebApplication',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    clearHashAfterLogin: true,
    nonceStateSeparator: 'semicolon',
  },
};
