import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { ControlService } from '../../services/control/control.service';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';

@Injectable()

export class StoresService {
    
    public stores: any[];

    constructor(public api: ApiService, public localstorage: LocalstorageService, private router: Router, private control: ControlService) {};

    public add(params, done, error) {
        params.users = [{
            "role":  4,
            "email": this.localstorage.get('email')
        }];
        this.api.post(environment.billing, '/billing/stores/add', params, res => {
            params.role    = 4;
            params.storeId = res.storeId;
            this.stores.push(params);
            done(res);
        }, err => {
            error(err);
        });
    };

    public list(params, done, error) {
        this.api.post(environment.billing, '/billing/stores/list', params, stores => {
            this.stores = this.control.applyRole(stores);
            done(this.stores);
        }, err => {
            error(err);
        });
    };

    public share(params, done, error) {
        this.api.post(environment.billing, '/billing/stores/share', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public update(params, done, error) {
        this.api.post(environment.billing, '/billing/stores/update', params, res => {
            this.stores.map(o => {
                if (o.storeId == params.storeId) {
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
        this.api.post(environment.billing, '/billing/stores/delete', params, res => {
            if (res.rowsDeleted > 0) {
                for (var i = 0; i < this.stores.length; ++i) {
                     if (this.stores[i].storeId == params.storeId) {
                        this.stores.splice(i, 1);
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
        this.api.post(environment.billing, '/billing/stores/unsubscribe', params, res => {
            if (res.length > 0) {
                for (var i = 0; i < this.stores.length; ++i) {
                     if (this.stores[i].storeId == params.storeId) {
                        this.stores.splice(i, 1);
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