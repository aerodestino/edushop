import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EnviosService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/envios/'
    }

    getArticulos(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}articulos`, { params: this.object2Params(params) });
    }

    getEstados(params: any) {
        params = this.serialize(params);
        return this.http.get(`${this.url}estados`, {params: this.object2Params(params)});
    }
}
