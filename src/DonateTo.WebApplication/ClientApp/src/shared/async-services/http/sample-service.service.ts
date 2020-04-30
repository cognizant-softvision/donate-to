import { Injectable } from '@angular/core';
import { BaseHttpClientService } from './base-http-client.service';
import { BaseModel } from '../../models/baseModel';
import { HttpClient } from '@angular/common/http';
import * as config from 'config/development.json';
import { Donation } from 'src/shared/models/Donation';

@Injectable({
    providedIn: 'root'
})

export class SampleService extends BaseHttpClientService<Donation> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            config.api.baseUrl,
            'api/v1/sample',
            undefined
        );
    }

    getSample() {
        return this.get();
    }
}
