export class HelperService {
    static isObject(obj: any) {
        const type = typeof obj;
        return type === 'object' && !!obj;
    }
}
