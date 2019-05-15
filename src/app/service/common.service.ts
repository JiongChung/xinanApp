import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
    setTimer: any = null;

    constructor() { }

    getPhoneCode(time: number, status: boolean, text: string, retext: string, type?: any) {
        if(type != undefined && type == 'off'){
            clearTimeout(this.setTimer)
        }

        let result: any = {};
        if(time == 0) {
            result.codeText = text;
            time = 60;
            result.status = true;
        } else {
            result.status = false;
            result.codeText = retext + '(' + time + 's)';
            time--;
            this.setTimer = setTimeout(() => {
                this.getPhoneCode(time,status,text,retext)
            }, 1000);
        }
        
        return result;
    }

    setCookie(name: string,value: string){ 
        let exp = new Date(); 
        exp.setTime(exp.getTime() + 30*24*60*60*1000); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toUTCString() + ";path=/";
    }
    
     getCookie(name: string){ 
        let reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        let arr = document.cookie.match(reg);
        if(arr != null){
            return unescape(arr[2]); 
        }
        else{
            return null; 
        }    
    }

     delCookie(name: string){ 
        let exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        let cval = this.getCookie(name); 
        if(cval !== null){
            document.cookie = name + "="+cval+";expires="+exp.toUTCString(); 
        } 
    }
}
