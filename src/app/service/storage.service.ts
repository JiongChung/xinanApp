import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(
        public storage: Storage
    ) { }

    async get(key: string, type?: string){
        return this.storage.get(key).then(value => {
            return (type == 'json') ? JSON.parse(value) : value;
        }).catch(() => {
            return null
        });
    }


    save(key: string, value: any, type?: string){
        return (type == 'json') ? this.storage.set(key, JSON.stringify(value)) : this.storage.set(key, value);       
    }

    delete(key: any){
        return this.storage.remove(key);
    }
}
