import { formatDate } from '@angular/common';

export interface AppBuildInterface {
    Build: number;
    Comment: string;
}

export interface AppVersionInterface {
    Version: string;
    ActiveBuild: number;
    LastBuild: number;
    Builds: AppBuildInterface[];
}

export interface AppInterface {
    AppName: string;
    Versions: AppVersionInterface[];
}

export interface AppResponseInterface {
    Apps: AppInterface[];
}

export class App implements AppInterface {
    AppName: string;
    Versions: AppVersionInterface[];

    constructor(name: string) {
        this.AppName = (name && name) || '';
        this.Versions = [
            {
                Version: formatDate(new Date(), 'yyyy-mm-dd HH:mm', 'en-us'),
                ActiveBuild: 1,
                LastBuild: 1,
                Builds: [
                    {
                        Build: 1,
                        Comment: ''
                    }
                ]
            }
        ];
    }
}
