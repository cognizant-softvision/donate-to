import { Injectable } from '@angular/core';
import { BaseHttpClientService } from './base-http-client.service';
import { BaseModel } from '../../models/baseModel';
import { HttpClient } from '@angular/common/http';
import * as config from 'config/development.json';

@Injectable({
    providedIn: 'root'
})

export class SampleService extends BaseHttpClientService<BaseModel> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            config.api.baseUrl,
            'api/v1/sample',
            undefined
        );
    }
}
