import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {
    slidesList: Array<any> = [];
    detailImageUrl: string = '';
    scrollWdith: string = '';
    itemWdith: string = '';
    aidMembers: Array<any> = [];
    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.getPublicAnnouncement();
        // console.log(screen.width)
    }

    getPublicAnnouncement(){
        this.api.getPublicAnnouncement().then((data: any) => {
            if(data){
                this.slidesList.push({
                    picture: data.result.imageUrl
                });
                this.scrollWdith = screen.width * data.result.aidMembers.length - data.result.aidMembers.length * 20  + 'px';
                this.itemWdith = screen.width - 30 + 'px';
                this.detailImageUrl = data.result.detailImageUrl;
                this.aidMembers = data.result.aidMembers;
            }
        })
    }

}
