import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: object;

  constructor() {
    this.load();
  }

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    this.config = environment;
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
