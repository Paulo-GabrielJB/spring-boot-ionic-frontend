import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credencias.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { LocalUser } from '../models/local_user';
import { StorageService } from "./store.service";
import * as jwt_decode from 'jwt-decode';

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


    refreshToken() : Observable<any>{
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, 
        {},
        {
            observe: 'response',
            responseType: 'text',
        });
    }

    successfullLoogin(authorizationValue: string): void{
        let token: string  = authorizationValue.substring(7);
        let email: string = jwt_decode(token).sub
        let user : LocalUser = {
            token,
            email
        }
        this.storageService.setLocalUser(user);
    }

    logout(): void{
        this.storageService.setLocalUser(null);
    }

}