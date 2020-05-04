import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../app-config.service';
import { HttpResponseHandler } from './httpResponseHandler.service';

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA,
}

@Injectable()
export class HttpService {
  public constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    protected responseHandler: HttpResponseHandler
  ) {}

  protected getBaseUrl(): string {
    return this.configService.get('api').baseUrl;
  }

  protected getDefaultHeaders(): object {
    return null;
  }
}
