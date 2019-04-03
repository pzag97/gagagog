import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Configuration, ConfigurationRequestParams } from '../models/configuration.model';
import { DownloadService } from '@app/core/services/download.service';
import configurationMock from '../mocks/configuration-mock.json';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

    constructor(private downloadService: DownloadService) {
    }

    fetchConfiguration(params: ConfigurationRequestParams): Observable<Configuration> {
        let config = this.getFromStorage(params);
        if (!config) {
            config = configurationMock;
            this.updateStorage(params, configurationMock);
        }
        return of(config);
    }

    downloadConfiguration(configuration: Configuration, name?: string) {
        return this.downloadService.downloadAsZip(JSON.stringify(configuration), name);
    }

    uploadConfiguration(params: ConfigurationRequestParams, config: Configuration) {
        this.updateStorage(params, config);
        return of({success: true});
    }

    private getFromStorage(params: ConfigurationRequestParams): Configuration {
        return JSON.parse(localStorage.getItem(this.configParamsToKey(params)));
    }

    private updateStorage(params: ConfigurationRequestParams, config: Configuration) {
        localStorage.setItem(this.configParamsToKey(params), JSON.stringify(config));
    }

    private configParamsToKey(params: ConfigurationRequestParams): string {
        return params.app + params.version + params.build;
    }
}
