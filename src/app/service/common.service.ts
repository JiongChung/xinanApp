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
}
