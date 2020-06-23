import { Injectable } from "@angular/core";

@Injectable()
export class ImageUtilService {

    dataUriToBlob(dataURI: string): Blob {
        let byteString: string = atob(dataURI.split(',')[1]);
        let mimeString: string = dataURI.split(',')[0].split(':')[1].split(';')[0]
        let ab: ArrayBuffer = new ArrayBuffer(byteString.length);
        let ia: Uint8Array = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });

    }
}