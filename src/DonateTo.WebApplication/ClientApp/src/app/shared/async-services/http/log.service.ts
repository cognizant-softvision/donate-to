import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogModel } from '../../models/log.model';
import { PageModel } from '../../models/page.model';
import { Observable } from 'rxjs/internal/Observable';
import { LogFilter } from '../../models/filters/log-filter';

@Injectable({
  providedIn: 'root',
})
export class LogService extends BaseHttpClientService<LogModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/Log');
  }

  getPagedFiltered(logFilter: LogFilter): Observable<PageModel<LogModel>> {
    const queryString = {
      pageNumber: logFilter?.pageNumber.toString() ?? '',
      pageSize: logFilter?.pageSize.toString() ?? '',
      message: logFilter?.message ?? '',
      exception: logFilter?.exception ?? '',
      level: this.intFilterToString(logFilter?.level),
      timeStampBegin: logFilter?.timeStampBegin?.toDateString() ?? '',
      timeStampEnd: logFilter?.timeStampEnd?.toDateString() ?? '',
      orderBy: logFilter?.orderBy ?? '',
      orderDirection: logFilter?.orderDirection ?? '',
    };
    return this.httpClient.get<PageModel<LogModel>>(`${this.url}/${this.endpoint}/pagedFiltered`, {
      params: queryString,
    });
  }

  getLogs() {
    return this.get();
  }
}
