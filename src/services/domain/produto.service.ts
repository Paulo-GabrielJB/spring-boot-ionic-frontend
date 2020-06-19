import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoDTO } from "../../models/produto.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient,) {
        
    }

    findById(id: string): Observable<ProdutoDTO>{
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${id}`);
    }

    findByCategoria(codigoCategoria: string) : Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${codigoCategoria}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url: string = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
    
    getSmallImageFromBucket(id: string): Observable<any> {
        let url: string = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}