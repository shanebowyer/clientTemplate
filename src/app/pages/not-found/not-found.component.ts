import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {
    constructor(private router: Router) {};

    public back() {
        this.router.navigate(['/home']);
    };

    ngOnInit() {
        if (this.router.url.length == 1) {
            this.router.navigate(['/home']);
        };
    };
}