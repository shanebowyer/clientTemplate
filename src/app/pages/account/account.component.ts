import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

    constructor(private router: Router) {};

    public message: string  = "";
    public loading: boolean = false;

    public back() {
        this.router.navigate(['/home'])
    };

    ngOnInit() {
    };
}