import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: object;
  private env: object;

  constructor(private http: HttpClient) {}

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        DataType: 'application/json',
      });
      const options = { headers };

      this.http.get('../../config/env.json').subscribe((env_data) => {
        this.env = env_data;

        this.http.get('/config/' + env_data['env'] + '.json').subscribe((data) => {
          this.config = data;
          resolve(true);
        });
      });
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
