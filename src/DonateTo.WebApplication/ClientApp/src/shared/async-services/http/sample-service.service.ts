import { Injectable } from '@angular/core';
import { BaseHttpClientService } from './base-http-client-service.service';
import { Base } from '../../models/base';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SampleService extends BaseHttpClientService<Base> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            'https://localhost:5001',
            'api/v1/sample',
            undefined
        );
    }
}
