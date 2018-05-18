import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-troubleshooting-page',
    templateUrl: './troubleshooting-page.component.html',
    styleUrls: ['./troubleshooting-page.component.scss']
})
export class TroubleshootingPageComponent implements OnInit {
    tips: {summary: string, details: string, imagePath: string}[];

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.tips = [
            {
                summary: 'Supply OK?',
                details: 'Check that your gas, electricity and water supplies are all turned on and working.\
                    If you have a pre-payment meter, make sure it hasn’t run out. If you have a header tank, and\
                    you can get to it safely, make sure the ball valve is still working.',
                imagePath: 'boiler-troubleshooting/troubleshoot-01.svg'
            },
            {
                summary: 'Controls on?',
                details: 'Check that all the heating controls are set to be on – this could include a\
                    room thermostat, a programmer and timer, and individual radiator valves. Set all \
                    timers to on and all thermostats up, and see if the heating fires up.',
                imagePath: 'boiler-troubleshooting/troubleshoot-02.svg'
            },
            {
                summary: 'Reset',
                details: 'If your boiler has a reset button, try pressing this – it might take a while \
                    for the boiler to fully reset. If you don’t have a reset button, you may be able \
                    to turn the boiler off and then back on again.',
                imagePath: 'boiler-troubleshooting/troubleshoot-03.svg'
            },
            {
                summary: 'Pressure',
                details: 'If your boiler has a pressure gauge, check that it’s somewhere in the green. \
                    If it’s too low, and you know how to top the pressure up, try this.',
                imagePath: 'boiler-troubleshooting/troubleshoot-04.svg'
            },
            {
                summary: 'Pilot light',
                details: 'If your boiler has a pilot light (a permanent flame that you can usually see \
                    burning even when the heating is off) check that this is still lit. If it’s gone \
                    out, try lighting it again if you know how.',
                imagePath: 'boiler-troubleshooting/troubleshoot-05.svg'
            },
            {
                summary: 'Frozen pipes',
                details: 'If the weather has been really cold, and you have a condensate pipe running from the \
                    bottom of your boiler into an outside drain, check that this pipe hasn’t frozen.\
                    If you have a header tank in the loft, check that the pipework up here hasn’t frozen.',
                imagePath: 'boiler-troubleshooting/troubleshoot-06.svg'
            },
        ];
    }

    onPostcodeSelected() {
        this.router.navigate(['/page-not-created']);
    }
}
