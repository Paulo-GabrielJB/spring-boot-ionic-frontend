import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { LocalUser } from "../models/local_user";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{


    constructor(public storageService: StorageService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{

        let localUser: LocalUser = this.storageService.getLocalUser(); 
        let n: number = API_CONFIG.baseUrl.length;
        let requestToAPI: boolean = req.url.substring(0, n) == API_CONFIG.baseUrl;

        if(localUser && requestToAPI){
            const authReq: HttpRequest<any> = req.clone({headers: req.headers.set('Authorization', `Bearer ${localUser.token}`)});
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};