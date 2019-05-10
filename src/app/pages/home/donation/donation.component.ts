import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {
    @Input() title: string;
    @Input() donationList: Array<any>;
    
    constructor(
        public navCtrl: NavController
    ) { }

    ngOnInit() {
        
    }

    login(): void{
        console.log(44)
        this.navCtrl.navigateForward(['/login']);
    }
}
