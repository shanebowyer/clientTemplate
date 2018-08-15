import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { ControlService } from '../../services/control/control.service';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';

@Injectable()

export class AdminsService {
    
    public admins:           any[] = [];
    public adminCredentials: any[] = [];

    constructor(public api: ApiService, public localstorage: LocalstorageService, private router: Router, private control: ControlService) {};

    public add(params, done, error) {
        this.api.post(environment.billing, '/billing/admins/add', params, res => {
            if (res.adminId) {
                params.adminId = res.adminId;
                this.admins.push(params);
            };
            done(res);
        }, err => {
            error(err);
        });
    };

    public list(params, done, error) {
        this.api.post(environment.billing, '/billing/admins/list', params, admins => {
            this.admins = this.control.applyRole(admins);
            done(this.admins);
        }, err => {
            error(err);
        });
    };

    public update(params, done, error) {
        this.api.post(environment.billing, '/billing/admins/update', params, res => {
            if (res.rowsUpdated == 1) {
                this.admins.map(o => {
                    if (o.adminId == params.adminId) {
                        o.email = params.email;
                        o.roles = params.roles;
                    };
                });
            };
            done(res);
        }, err => {
            error(err);
        });
    };

    public delete(params, done, error) {
        this.api.post(environment.billing, '/billing/admins/delete', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public isAdmin() {
        return new Promise((resolve, reject) => {
            this.api.post(environment.billing, '/billing/admins/isadmin', {
                'filter': ['roles']
            }, res => {
                this.adminCredentials = res.roles;
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    };

    public checkCredentials(role) {
        let valid = false;
        this.adminCredentials.map(cred => {
            if (cred.role == role && cred.value) {
                valid = true;
            };
        });
        return valid;
    };
}