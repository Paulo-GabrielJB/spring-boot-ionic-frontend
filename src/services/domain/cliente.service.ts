import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
        public imageUtilService: ImageUtilService) {
    }

    findByEmail(email: string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    findById(id: string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url: string = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: ClienteDTO): Observable<any> {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    uploadPicture(base64image: string): Observable<any>{
        let formData: FormData = new FormData();
        let imageBlob: Blob = this.imageUtilService.dataUriToBlob(base64image);
        formData.append('file', imageBlob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}