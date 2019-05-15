import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(
        public storage: Storage
    ) { }

    async getStorage(key: string, type?: string): Promise<any>{
        let result = await this.storage.get(key).then((value: any) => {
            return (type == 'json') ? JSON.parse(value) : value;
        }); 

        return result;
    }


    save(key: string, value: any, type?: string){
        return (type == 'json') ? this.storage.set(key, JSON.stringify(value)) : this.storage.set(key, value);       
    }

    delete(key: any){
        return this.storage.remove(key);
    }

     
}
