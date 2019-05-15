import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { StorageService } from '../service/storage.service';
import { CommonService } from '../service/common.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    api: string = '//192.168.2.110:900';
    requestHeaders:any = {};
    headers:any = {};

    constructor(
        public http: HttpClient,
        public commonService: CommonService,
        public storage: StorageService
    ) { 
        this.getCookie();
        this.getToken('user','json');
    }

     getCookie(){
        this.headers.Authorization = this.commonService.getCookie('user') ? 'Bearer ' + JSON.parse(this.commonService.getCookie('user')).accessToken : null;
        this.requestHeaders.headers = this.headers;
    }

    async getToken(key: string, type?: string): Promise<any>{
        let result = await this.storage.getStorage(key, type);
    }
    
    getCommonTitle() {
        // return '心安救助';
        return '标题';
    }
    getInit(){  
        return this.http.post(this.api+'/api/services/app/Xinan/Init',this.requestHeaders);
    }

    authenticate(input: any){
        return this.http.post(this.api+'/api/TokenAuth/Authenticate',input,this.requestHeaders);
    }

    getMyProfile(){
        return this.http.get(this.api+'/api/services/app/MyProfile/GetMyProfile',this.requestHeaders);
    }

    getInviteShare(){
        return this.http.get(this.api+'/api/services/app/MyProfile/GetInviteShare',this.requestHeaders);
    }

    getPublicAnnouncement(){
        return this.http.get(this.api+'/api/services/app/MyProfile/GetPublicAnnouncement',this.requestHeaders);
    }
}
