import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FileService {
    readFile(file): Promise<{filename: string; filetype: string; value: any}> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const value = reader.result;
                const fileInfo = {
                    filename: file.name,
                    filetype: file.type,
                    value
                };
                resolve(fileInfo);
            };
        });
    }
}
