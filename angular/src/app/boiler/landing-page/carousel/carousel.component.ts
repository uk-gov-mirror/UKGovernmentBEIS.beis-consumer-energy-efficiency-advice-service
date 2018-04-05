// TODO:BEISDEAS-228 delete the carousel component when we have new designs

import {Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    carouselItems: {summary: string, details: string}[];
    currentItem: number;
    xDown: number;
    yDown: number;

    ngOnInit() {
        this.carouselItems = [
            {
                summary: 'Double check the basics',
                details: 'First of all, if you have a prepayment meter, check that you\'ve got enough \
                    credit. Next, test whether your \other gas appliances, like you cooker hob, are working \
                    correctly, or whether the switches in your fuse box have tripped.',
            },
            {
                summary: 'Think back to if you\'ve had a power cut recently',
                details: 'If you have, your boiler\'s timer might have reset - which means getting it working \
                    again could be as simple as re-programming it with your times. Take a look at its instruction \
                    manual for a reminder on how to do this.',
            },
            {
                summary: 'Check your boiler\'s pressure gauge',
                details: 'If it\'s showing a reading of one bar or less, low pressure could be the reason why your \
                    boiler\'s not working. Topping up the pressure yourself is usually straightforward - follow the \
                    steps in your boiler\'s manual or watch our how-to video.',
            },
            {
                summary: 'Double check the basics',
                details: 'First of all, if you have a prepayment meter, check that you\'ve got enough credit. Next, test \
                    whether your other gas appliances, like you cooker hob, are working correctly, or whether the switches in \
                    your fuse box have tripped.',
            },
            {
                summary: 'Think back to if you\'ve had a power cut recently',
                details: 'If you have, your boiler\'s timer might have reset - which means getting it working again could be \
                    as simple as re-programming it with your times. Take a look at its instruction manual for a reminder on how \
                    to do this.',
            },
        ];
        this.currentItem = 0;
        this.xDown = null;
        this.yDown = null;
    }

    canScrollForwards(): boolean {
        if (window.outerWidth <= 600) {
            return this.currentItem < this.carouselItems.length - 1;
        }else if (window.outerWidth > 600 && window.outerWidth <= 992) {
            return this.currentItem < this.carouselItems.length - 2;
        } else {
            return this.currentItem < this.carouselItems.length - 3;
        }
    }

    canScrollBackwards(): boolean {
        return this.currentItem > 0;
    }

    scrollForwards() {
        if (this.canScrollForwards()) {
            this.currentItem++;
        }
    }

    scrollBackwards() {
        if (this.canScrollBackwards()) {
            this.currentItem--;
        }
    }

    @HostListener('document:touchstart', ['$event'])
    handleTouchStart(event: any) {
        this.xDown = event.touches[0].clientX;
        this.yDown = event.touches[0].clientY;
    }

    @HostListener('document:touchmove', ['$event'])
    handleTouchMove(event: any) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;

        const xDiff = this.xDown - xUp;
        const yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                if (this.canScrollForwards()) {
                    this.currentItem++;
                }
            } else {
                if (this.canScrollBackwards()) {
                    this.currentItem--;
                }
            }
        }

        this.xDown = null;
        this.yDown = null;
    }
}
