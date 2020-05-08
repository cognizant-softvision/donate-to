import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: object;
  private env: object;

  private productionConfig = {
    api: {
      baseUrl: '/api',
    },

    paths: {
      imagesRoot: '/assets/images/',
      userImageFolder: '/assets/images/users/',
    },

    localization: {
      languages: [
        { code: 'hr', name: 'HR', culture: 'hr-HR' },
        { code: 'en', name: 'EN', culture: 'en-EN' },
      ],
      defaultLanguage: 'hr',
    },

    notifications: {
      options: {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        position: ['top', 'right'],
        theClass: 'sy-notification',
      },
      unauthorizedEndpoints: ['api/products'],
      notFoundEndpoints: ['api/products', 'api/account/login', 'api/account/register'],
    },

    debugging: false,

    authConfig: {
      issuer: 'https://localhost:44392',
      redirectUri: 'https://localhost:44372',
      clientId: 'DonateTo.WebAplication',
      responseType: 'code',
      scope: 'openid profile',
      showDebugInformation: true,
    },
  };

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    return new Promise((resolve) => {
      // TODO: retrieve configuration from config files.
      this.config = this.productionConfig;
      resolve(true);
    });
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key
   */
  getEnv(key: any) {
    return this.env[key];
  }

  /**
   * Returns configuration value based on given key
   *
   * @param key
   */
  get(key: any) {
    return this.config[key];
  }
}
