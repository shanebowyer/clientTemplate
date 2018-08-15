import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { ControlService } from '../../services/control/control.service';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';

@Injectable()

export class CartService {
    
    public cart: any[] = [];

    constructor(public api: ApiService, public localstorage: LocalstorageService, private router: Router, private control: ControlService, public snackBar: MatSnackBar) {};

    public list(params, done, error) {
        this.api.post(environment.billing, '/billing/carts/list', params, cart => {
            this.cart = cart;
            done(this.cart);
        }, err => {
            error(err);
        });
    };

    public update(params, done?) {
        this.api.post(environment.billing, '/billing/carts/update', params, res => {
            done();
        }, err => {
            
        });
    };

    public addToCart(item) {
        this.list({}, res => {
            let itemFound = false;
            this.cart.map(i => {
                if (i.productId == item.productId) {
                    itemFound = true;
                    i.quantity++;
                };
            });

            if (!itemFound) {
                this.cart.push({
                    'date':      new Date(),
                    'quantity':  1,
                    'productId': item.productId
                });
            };
            this.update({
                'cart': this.cart
            }, () => {
                this.snackBar.open('Item Added To Cart!', null, {
                    'duration': 3000
                });
            });
        }, err => {
            if (err.errors[0].code == 69) {
                this.cart = [
                    {
                        'date':      new Date(),
                        'quantity':  1,
                        'productId': item.productId
                    }
                ];
                this.update({
                    'cart': this.cart
                }, () => {
                    this.snackBar.open('Item Added To Cart!', null, {
                    'duration': 3000
                });
                });
            };
        });
    };
}