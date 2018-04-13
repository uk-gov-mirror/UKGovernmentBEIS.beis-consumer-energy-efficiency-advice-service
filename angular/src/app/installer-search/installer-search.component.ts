import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-installer-search',
  templateUrl: './installer-search.component.html',
  styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {

  constructor(private router: Router) { }

    ngOnInit() {
        this.route.paramMap
            .switchMap(params => {
                this.isLoading = true;
                return this.measureService.getMeasure(params.get('slug'));
            })
            .subscribe(
                (measureData) => this.displayMeasure(measureData),
                (err) => this.displayErrorAndLogMessage(err)
            );
    }
}
