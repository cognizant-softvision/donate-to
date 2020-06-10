import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseHttpClientService<CategoryModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/category');
  }

  getCategories() {
    return this.get();
  }
}
