import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { App, AppInterface, AppResponseInterface } from '@app/operational-client/models/application.model';
import { applicationsResponse } from '@app/operational-client/mocks/applications-mock';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApplicationService {

    constructor(private http: HttpClient) {
    }

    fetchApplications(): Observable<AppResponseInterface> {
        let apps = this.getFromStorage();
        if (!apps) {
            apps = applicationsResponse;
            this.updateStorage(applicationsResponse);
        }
        return of(apps);
    }

    createApplication(name: string): Observable<AppInterface> {
        return this.fetchApplications().pipe(
            switchMap(response => {
                if (response.Apps.findIndex(app => app.AppName === name) !== -1) {
                    return throwError(`Cannot add an app with name ${name} as an app with that name already exists`);
                }
                const newApp = new App(name);
                response.Apps.push(newApp);
                this.updateStorage(response);
                return of(newApp);
            })
        );
    }

    deleteApplication(name: string): Observable<{ success: boolean }> {
        return this.fetchApplications().pipe(
            switchMap(response => {
                const index = response.Apps.findIndex(app => app.AppName === name);
                if (index === -1) {
                    return throwError(`Application not found. Please refresh your page in case if interface is not up to date`);
                }
                response.Apps.splice(index, 1);
                this.updateStorage(response);
                return of({success: true});
            })
        );
    }

    private updateStorage(appResponse: AppResponseInterface) {
        localStorage.setItem('applications', JSON.stringify(appResponse));
    }

    private getFromStorage(): AppResponseInterface {
        return JSON.parse(localStorage.getItem('applications'));
    }
}
