import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { StorageService } from '../../service/storage.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    title: string = '';
    homeSlides: Array<any> = [];
    toolData: any = {};
    donationList: Array<any> = [];
    constructor(
        private events: Events,
        public api: ApiService,
        public storage: StorageService
    ) { }
  
    ngOnInit() {
        this.title = this.api.getCommonTitle();
        this.getInit();
        // let input = {
        //     name: '43434'
        // }
        // this.storage.save('input', input, 'json');
        // setTimeout(() => {
        //     this.storage.get('name').then((name) => {
        //         console.log(name)
        //     });
        // },5000);
        // this.storage.remove('name').then(() => {
        //     console.log('Name item has been removed');
        // });
        setTimeout(() => {
            
            this.getName();
        }, 5000);
    }

    async getName(){
        let name = await this.storage.getStorage('sdsd');
        console.log(name)
    }
    
    ionViewDidEnter(){
        this.events.subscribe('reloadPage',() => {
            this.getUserInfo();
        });
    }

    async getUserInfo(){
        let user = await this.storage.getStorage('user','json');
        console.log(user)
    }

    getInit(): void{
        this.api.getInit().subscribe((data: any) => {
            if(data.success){
                this.homeSlides = data.result.homeSlides;
                this.toolData.showNumberOfMembers = data.result.showNumberOfMembers;
                this.toolData.showNumberOfRescued = data.result.showNumberOfRescued;
                this.toolData.showTotalFund = data.result.showTotalFund;
                this.donationList = data.result.items;
            }
        });
    }
}
