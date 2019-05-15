import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {
    page: string = '';
    constructor(
        public activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.page = params['returnUrl'];
        });
    }

}
