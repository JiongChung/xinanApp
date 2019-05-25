import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events, NavController } from '@ionic/angular';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit {
    loginForm: FormGroup;
    phone: string = '';
    phoneCode: number = null;
    password: any = '';
    title: string = '';
    changeText: string = ''; 
    isPasswordLogin: boolean = true;
    phoneCodeText: string = '';
    countTime: number = 60;
    interval: any = null;
    isGetPhoneCodeing: boolean = false;

    constructor(
        public fb: FormBuilder,
        private events: Events,
        public commonService: CommonService,
        public api: ApiService,
        public nav: NavController,
        public storage: StorageService
    ) { 
    }

    ngOnInit() {
        // this.title = '心安救助欢迎您';
        this.changeText = '验证码登录';
        this.phoneCodeText = '获取验证码';
        this.resetValue();
        this.createForm();   
    }

    createForm(){
        this.loginForm = this.fb.group({
            phone: ['', [ Validators.required, Validators.pattern(/(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phoneCode: ['', [Validators.required]]
        });   
    }

    save() {
        let input: any = {};
        if(this.isPasswordLogin){
            input.userNameOrEmailAddress = this.phone.toString();
            input.password = this.password;
        }
        
        this.api.authenticate(input).then((data: any) => {
            if(typeof(data) == 'object' && data.success){
                this.storage.save('user', data.result, 'json');
                this.commonService.setCookie('Abp.AuthToken',data.result.accessToken);
                this.nav.pop().then(()=>{
                    this.events.publish('reloadPage');
                });
            }
        }).catch((err: any) => console.log(344444));
        // console.log(this.loginForm.value);
    }

    changeLoginType(): void{
        this.isPasswordLogin = !this.isPasswordLogin;
        this.changeText = this.isPasswordLogin ? '验证码登录' : '密码登录';
        this.resetValue();
        this.interval = window.clearInterval(this.interval);
        let result = this.commonService.getPhoneCode(0 ,true,'获取验证码','重新发送','off');
        this.phoneCodeText = result.codeText;
        this.isGetPhoneCodeing = false;
        this.countTime = 60;
    }

    resetValue(): void{
        this.phoneCode = this.isPasswordLogin ? 123456 : null;
        this.password = this.isPasswordLogin ? '' : '123456'; 
    }

    getCode(): void{
        this.isGetPhoneCodeing = true;
        this.interval = self.setInterval(() => this.clocking(),1000);        
    }

    clocking(): void{
        let result = this.commonService.getPhoneCode(this.countTime ,true,'获取验证码','重新发送');
        if(result.status){
            this.interval = window.clearInterval(this.interval);
            this.isGetPhoneCodeing = false;
        }
        this.phoneCodeText = result.codeText;
        this.countTime --;
    }

}
