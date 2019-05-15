import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { Injectable } from '@angular/core';
declare var Wechat: any;

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
// @Injectable()
export class InvitePage implements OnInit {
    imageUrl: string = '';

    //标题
    title: string = "2222";
    //描述
    description: string = "4444";
    //分享链接
    link: string = "https://www.jianshu.com/p/b64d68114f95";
    //分享图片
    image: string = "";

    constructor(
        private api: ApiService,
        public loadingCtrl: LoadingController, 
        public toastCtrl: ToastController
    ) { }

    ngOnInit() {
        this.getInviteShare();
    }

    getInviteShare(){
        this.api.getInviteShare().subscribe((data: any) => {
            this.imageUrl = data.result.imageUrl;
        })
    }

    async wxShare(scene: any) {
        var loading = await this.loadingCtrl.create({ showBackdrop: false });
        loading.present();
        try {
            Wechat.isInstalled((installed) => {
                if (installed) {
                    Wechat.share({
                        message: {
                            title: this.title,
                            description: this.description,
                            thumb: this.imageUrl,
                            mediaTagName: "TEST-TAG-001",
                            messageExt: "",  // 这是第三方带的测试字段
                            messageAction: "", // <action>dotalist</action>
                            media: {
                                type: Wechat.Type.WEBPAGE,
                                webpageUrl: this.link
                            }
                        },
                        scene: scene == 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline  // share to Timeline
                    }, () => {
                        this.toastCtrl.create({
                            message: '分享成功！',
                            duration: 3000
                        });
                    }, (reason) => {
                        this.toastCtrl.create({
                            message: '分享失败！',
                            duration: 3000
                        });
                    });
                } else {
                    this.toastCtrl.create({
                        message: '没有安装微信',
                        duration: 3000
                    });
                }
            }, function (reason) {
                console.log("Failed: " + reason);
            });
        } catch (error) {
            console.log(error);
        } finally {
            loading.dismiss();
        }
    }


    share(){
        this.wxShare(0);
    }
}
