import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../app-config.service';
import { QuestionModel } from '../../models/question.model';
import { Observable } from 'rxjs';
import { QuestionFilter } from '../../models/filters/question-filter';
import { PageModel } from '../../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService extends BaseHttpClientService<QuestionModel> {
  constructor(httpClient: HttpClient, configService: ConfigService, h1: HttpClient) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/question');
  }

  getPagedFiltered(questionFilter: QuestionFilter): Observable<PageModel<QuestionModel>> {
    const queryString = {
      pageNumber: questionFilter.pageNumber.toString(),
      pageSize: questionFilter.pageSize.toString(),
      label: questionFilter.label,
      placeholder: questionFilter.placeholder,
      type: questionFilter.type,
      orderBy: questionFilter.orderBy,
      orderDirection: questionFilter.orderDirection,
    };
    return this.httpClient.get<PageModel<QuestionModel>>(`${this.url}/${this.endpoint}/pagedFiltered`, {
      params: queryString,
    });
  }
}
