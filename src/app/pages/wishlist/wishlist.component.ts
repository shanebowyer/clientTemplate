import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})

export class WishlistComponent implements OnInit {

    constructor(private router: Router) {};

    public message: string  = "";
    public loading: boolean = false;

    public back() {
        this.router.navigate(['/home'])
    };

    ngOnInit() {
    };
}