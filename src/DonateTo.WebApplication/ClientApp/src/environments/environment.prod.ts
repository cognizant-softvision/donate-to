export const environment = {
  production: true,
  baseUrl: '',
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
    issuer: '',
    redirectUri: '',
    clientId: 'DonateTo.WebApplication',
    responseType: 'code',
    scope: 'openid profile offline_access',
    showDebugInformation: true,
    clearHashAfterLogin: true,
    nonceStateSeparator: 'semicolon',
  },
};
