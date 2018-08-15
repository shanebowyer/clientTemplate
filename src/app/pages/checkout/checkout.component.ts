import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

    constructor(private router: Router) {};

    public message: string  = "";
    public loading: boolean = false;

    public back() {
        this.router.navigate(['/home'])
    };

    ngOnInit() {
    };
}