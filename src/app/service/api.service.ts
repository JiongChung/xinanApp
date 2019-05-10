import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    api: string = '//192.168.2.110:900';
    constructor(
        private http: HttpClient
    ) { }
    
    getCommonTitle() {
        // return '心安救助';
        return '标题';
    }
    getInit(){  
        return this.http.post(this.api+'/api/services/app/Xinan/Init',{});
    }

    authenticate(input: any){
        return this.http.post(this.api+'/api/TokenAuth/Authenticate',input);
    }
}
