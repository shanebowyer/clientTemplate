import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AdminsService } from './../../services/admins/admins.service';
import { ShareComponent } from './../../components/share/share.component';
import { ControlService } from './../../services/control/control.service';
import { ProductsService } from './../../services/products/products.service';
import { RemoveComponent } from './../../components/remove/remove.component';
import { UnsubscribeComponent } from './../../components/unsubscribe/unsubscribe.component';
import { Input, OnInit, ViewChild, Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    constructor(private service: ProductsService, private dialog: MatDialog, private control: ControlService, private router: Router, public adminsService: AdminsService, private meta: Meta) {
        this.meta.addTag({
            'name':    'description',
            'content': 'biTid Online Store'
        });
        this.meta.addTag({
            'name':    'author',
            'content': 'biTid'
        });
        this.meta.addTag({
            'name':    'keywords',
            'content': 'Store, Secure, biTid, Online'
        });
    };

    public message:  string  = "";
    public loading:  boolean = false;
    public products: any[]   = [];

    private GetProducts() {
        this.service.list({
            'filter': ['title', 'price', 'productId', 'mainImage']
        }, res => {
            this.products = res;
        }, err => {

        });
    };

    ngOnInit() {
        if (this.control.CheckTokenEmail()) {
            this.GetProducts();
        } else {
             this.router.navigate(['/login'], {
                'queryParams': {
                    'returnToUrl': this.router.url
                }
            });
        };
    };
}