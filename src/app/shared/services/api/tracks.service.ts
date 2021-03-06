import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TracksService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/tracks/'
    }

    informarCompra(resource?: any): Observable<any> {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}informar-compra`, resource);
    }

        list(params?: any, responseType?: any): Observable<any> {
        if (!params) return this.http.get(this.url);
        params = this.serialize(params);
        return this.http.get(`${this.url}web`, {
          params: this.object2Params(params),
          responseType: responseType
        });
      }
}
