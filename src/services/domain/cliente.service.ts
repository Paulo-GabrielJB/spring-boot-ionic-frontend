import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../store.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,) {
        
    }

    findByEmail(email: string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url: string = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}