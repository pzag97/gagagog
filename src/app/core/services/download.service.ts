import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

@Injectable({providedIn: 'root'})
export class DownloadService {
    downloadAsZip(file: string, name = 'configuration'): Promise<any> {
        if (!file) {
            return;
        }
        const zip = new JSZip();
        zip.file<string>(`${name}.json`, file);

        return zip.generateAsync({type: 'blob'}).then(content => {
            saveAs(content, `${name}.zip`);
        });
    }
}
