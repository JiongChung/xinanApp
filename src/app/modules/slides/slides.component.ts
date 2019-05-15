import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit,OnChanges {
    @ViewChild('slides') slides: any;
    @Input() slidesList: Array<any>;

    showSlideBar: boolean = false;
    slideOpts: any = {
        effect: 'flip',  
        autoplay: {
            delay: 3000,
        },
        loop: true
    };
    slideList: Array<any> = [];
    
    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(){
        this.showSlideBar = (this.slidesList.length > 1) ? true : false;
        this.slideOpts.loop = this.showSlideBar;
    }

    //手动滑动后轮播图不自动轮播的解决方法
    slideDidChange(){
        this.slides.startAutoplay();
    }

}
