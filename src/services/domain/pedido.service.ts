import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class PedidoService {

    constructor(public http: HttpClient,) {
        
    }


    insert(obj: PedidoDTO): Observable<PedidoDTO> {
        return this.http.post<PedidoDTO>(
            `${API_CONFIG.baseUrl}/pedidos`, 
            obj
        );
    }
}