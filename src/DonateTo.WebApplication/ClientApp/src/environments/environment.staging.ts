export const environment = {
  production: false,
  baseUrl: 'https://donateapiqa.azurewebsites.net/',
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
    issuer: 'https://donateidentityqa.azurewebsites.net/',
    redirectUri: 'https://donatewebqa.azurewebsites.net/',
    clientId: 'DonateTo.WebApplication',
    responseType: 'code',
    scope: 'openid profile offline_access',
    showDebugInformation: true,
    clearHashAfterLogin: true,
    nonceStateSeparator: 'semicolon',
  },
};
