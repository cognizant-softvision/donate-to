import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class QuestionService extends BaseHttpClientService<Question> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/question');
  }

  getQuestions() {
    return this.get();
  }
}
