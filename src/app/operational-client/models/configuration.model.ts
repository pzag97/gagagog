export interface ConfigurationRequestParams {
    app: string;
    version: string;
    build: number;
}

export interface Configuration {
    [key: string]: string | boolean | number | object;
}
