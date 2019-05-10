import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    @Input() toolData: any;
    constructor() { }

    ngOnInit() {
        this.toolData.showNumberOfMembers = 0;
        this.toolData.showTotalFund = 0;
        this.toolData.showNumberOfRescued = 0;
    }

}
