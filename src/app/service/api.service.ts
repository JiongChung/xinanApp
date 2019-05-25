import { Injectable } from '@angular/core';
import { StorageService } from '../service/storage.service';
import {CommonService } from '../service/common.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AppComponentBase } from '../common/app-component-base';
import * as moment from 'moment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends AppComponentBase {
    api: string = '//192.168.2.110:900';
    requestHeaders:any = {};
    headers:any = {};
    loadingText: string = '';
    constructor(
        public commonService: CommonService,
        public storage: StorageService,
        public alertCtrl: AlertController,
        public loadingCtl: LoadingController,
        public toastCtrl: ToastController
    ) { 
        super();
        this.loadingText = '请稍等……';
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.commonService.getCookie('Abp.AuthToken');
    }
    
    getCommonTitle() {
        // return '心安救助';
        return '标题';
    }

    async alertItems(msg: string){
        const alert = await this.alertCtrl.create({
            header: '警告',
            message: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    async getInit(){  
        await super.showLoading(this.loadingCtl, this.loadingText);
        return axios.post(this.api+'/api/services/app/Xinan/Init').then((res: any) => {
            this.loadingCtl.dismiss();
            return res.data;
        }).catch((err: any) => {
            // this.alertItems(err.response.data.error.message)
            super.showToast(this.toastCtrl, err.response.data.error.message);
            this.loadingCtl.dismiss();
        });
    }

    async authenticate(input: any){
        await super.showLoading(this.loadingCtl, this.loadingText);
        return axios.post(this.api+'/api/TokenAuth/Authenticate',input).then((res: any) => {
            this.loadingCtl.dismiss();
            return res.data;
        }).catch((err: any) => {
            super.showToast(this.toastCtrl, err.response.data.error.message + '，'+err.response.data.error.details);
            this.loadingCtl.dismiss();
        });
    }

    async getMyProfile(){
        await super.showLoading(this.loadingCtl, this.loadingText);
        return axios.get(this.api+'/api/services/app/MyProfile/GetMyProfile').then((res: any) => {
            this.loadingCtl.dismiss();
            return res.data;
        }).catch((err: any) => {
            super.showToast(this.toastCtrl, err.response.data.error.message);
            this.loadingCtl.dismiss();
        });
    }

    async getInviteShare(){
        await super.showLoading(this.loadingCtl, this.loadingText);
        return axios.get(this.api+'/api/services/app/MyProfile/GetInviteShare').then((res: any) => {
            this.loadingCtl.dismiss();
            return res.data;
        }).catch((err: any) => {
            super.showToast(this.toastCtrl, err.response.data.error.message);
            this.loadingCtl.dismiss();
        });
    }

    async getPublicAnnouncement(){
        await super.showLoading(this.loadingCtl, this.loadingText);
        return axios.get(this.api+'/api/services/app/MyProfile/GetPublicAnnouncement').then((res: any) => {
            this.loadingCtl.dismiss();
            return res.data;
        }).catch((err: any) => {
            super.showToast(this.toastCtrl, err.response.data.error.message);
            this.loadingCtl.dismiss();
        });
    }
}
