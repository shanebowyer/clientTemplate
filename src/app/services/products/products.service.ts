import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { ControlService } from '../../services/control/control.service';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';

@Injectable()

export class ProductsService {
    
    public products: any[];

    constructor(public api: ApiService, public localstorage: LocalstorageService, private router: Router, private control: ControlService) {};

    public add(params, done, error) {
        params.users = [{
            "role":  4,
            "email": this.localstorage.get('email')
        }];
        this.api.post(environment.billing, '/billing/products/add', params, res => {
            params.role    = 4;
            params.productId = res.productId;
            this.products.push(params);
            done(res);
        }, err => {
            error(err);
        });
    };

    public list(params, done, error) {
        this.api.post(environment.billing, '/billing/products/list', params, products => {
            this.products = this.control.applyRole(products);
            done(this.products);
        }, err => {
            error(err);
        });
    };

    public share(params, done, error) {
        this.api.post(environment.billing, '/billing/products/share', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public update(params, done, error) {
        this.api.post(environment.billing, '/billing/products/update', params, res => {
            this.products.map(o => {
                if (o.productId == params.productId) {
                    o.logo             = params.logo;
                    o.description      = params.description;
                    o.organizationOnly = params.organizationOnly;
                };
            });
            done(res);
        }, err => {
            error(err);
        });
    };

    public delete(params, done, error) {
        this.api.post(environment.billing, '/billing/products/delete', params, res => {
            if (res.rowsDeleted > 0) {
                for (var i = 0; i < this.products.length; ++i) {
                     if (this.products[i].productId == params.productId) {
                        this.products.splice(i, 1);
                        break;
                    };
                };
            };
            done(res);
        }, err => {
            error(err);
        });
    };

    public unsubscribe(params, done, error) {
        params.users = [this.localstorage.get('email')];
        this.api.post(environment.billing, '/billing/products/unsubscribe', params, res => {
            if (res.length > 0) {
                for (var i = 0; i < this.products.length; ++i) {
                     if (this.products[i].productId == params.productId) {
                        this.products.splice(i, 1);
                        console.log("You were Unsubscribed!");
                        break;
                    };
                };
            };
            done(res);
        }, err => {
            error(err);
        });
    };
}