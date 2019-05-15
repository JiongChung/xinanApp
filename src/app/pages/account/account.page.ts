import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { StorageService } from '../../service/storage.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {
    title: string = '我的';
    avatar: string = '';
    name: string = '';
    tags: string = '';
    isLoadHeadComplete: boolean = false;

    userInfo: any = {};

    constructor(
        public api: ApiService,
        public navCtrl: NavController,
        public commonService: CommonService,
        public storage: StorageService
    ){}

    ngOnInit(){
        // setTimeout(() => {
        //     this.isLoadHeadComplete = true;
        //     this.avatar = 'http://f-dev.huiaichina.com/app/module/xinan.png';
        //     this.name = '某某的权益';
        //     this.tags = '1位成员';
        // }, 2000);
        this.api.getMyProfile().subscribe((data: any) => {
            this.userInfo.nickName = data.result.nickName;
            this.userInfo.numberOfMember = data.result.numberOfMember;
            this.userInfo.profileLogoUrl = data.result.profileLogoUrl;
            this.avatar = 'http://f-dev.huiaichina.com/app/module/xinan.png';
            this.tags = '1位成员';
            this.isLoadHeadComplete = true;
            this.name = '某某的权益';
        },(err: any) => {
            console.log(err.error.error.message)
        });
    }

    goTo(num: number){
        this.navCtrl.navigateForward(['/detailpage'],{
            queryParams:{
                returnUrl:'434'
            }
        })
    }

    call(){
    }
}
