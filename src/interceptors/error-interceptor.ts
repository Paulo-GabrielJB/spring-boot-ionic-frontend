import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/store.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storageService: StorageService) {  
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req)
        .catch((error, caught) => {
            
            let errorObj: any = error;

            if(errorObj.error)
                errorObj = errorObj.error;

            if(!errorObj.status)
                errorObj = JSON.parse(errorObj);

            console.log("Erro detectado pelo interceptor");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
            }

            return Observable.throw(errorObj);
        }) as  any;
    }

    handle403(){
        this.storageService.setLocalUser(null);
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};