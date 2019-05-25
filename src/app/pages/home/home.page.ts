import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { StorageService } from '../../service/storage.service';
import { Events } from '@ionic/angular';
import { AppComponentBase } from '../../common/app-component-base';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends AppComponentBase implements OnInit {
    title: string = '';
    homeSlides: Array<any> = [];
    toolData: any = {};
    donationList: Array<any> = [];

    constructor(
        private events: Events,
        public api: ApiService,
        public storage: StorageService,
        public loadingCtrl: LoadingController
    ) { 
        super();
    }
  
    ngOnInit() {
        this.title = this.api.getCommonTitle();
        this.getInit();
    }
    
    ionViewDidEnter(){
        this.events.subscribe('reloadPage',() => {
            this.getInit();
        });
    }

    getInit(): void{
        this.api.getInit().then((data: any) => {
            if(typeof(data) == 'object' && data.success){
                this.homeSlides = data.result.homeSlides;
                this.toolData.showNumberOfMembers = data.result.showNumberOfMembers;
                this.toolData.showNumberOfRescued = data.result.showNumberOfRescued;
                this.toolData.showTotalFund = data.result.showTotalFund;
                this.donationList = data.result.items;
            }
        });
    }
}
