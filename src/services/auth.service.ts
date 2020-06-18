import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credencias.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { LocalUser } from '../models/local_user';
import { StorageService } from "./store.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storageService: StorageService) {
    }

    authenticate(creds : CredenciaisDTO) : Observable<any>{
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds,
        {
            observe: 'response',
            responseType: 'text',
        });
    }

    successfullLoogin(authorizationValue: string){
        let token: string  = authorizationValue.substring(7);
        let user : LocalUser = {
            token
        }
        this.storageService.setLocalUser(user);
    }

    logout(){
        this.storageService.setLocalUser(null);
    }

}