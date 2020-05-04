import { Injectable } from '@angular/core';
import {
  RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs';
import { HttpResponseHandler } from './httpResponseHandler.service';
import { HttpAdapter } from './http.adapter';
import { ConfigService } from '../../../app-config.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA
}

@Injectable()
export class HttpService {

  public constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    protected responseHandler: HttpResponseHandler) {
  }

  protected getBaseUrl(): string {
    return this.configService.get('api').baseUrl;
  }

  protected getDefaultHeaders(): Object {
    return null;
  }
}
