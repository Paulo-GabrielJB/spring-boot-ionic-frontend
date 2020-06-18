import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/store.service";
import { AlertController, Alert } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storageService: StorageService,
        public alertCtrl: AlertController) {  
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
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                default:
                    this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as  any;
    }

    handle401(){
        let alert: Alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                { 
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handle403(){
        this.storageService.setLocalUser(null);
    }

    handleDefaultError(errorObj: any) {
        let alert: Alert = this.alertCtrl.create({
            title: `Erro ${errorObj.status}: ${errorObj.error}`,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                { 
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};