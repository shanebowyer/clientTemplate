import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { ControlService } from '../../services/control/control.service';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';

@Injectable()

export class DepartmentsService {
    
    public departments: any[];

    constructor(public api: ApiService, public localstorage: LocalstorageService, private router: Router, private control: ControlService) {};

    public add(params, done, error) {
        params.users = [{
            "role":  4,
            "email": this.localstorage.get('email')
        }];
        this.api.post(environment.billing, '/billing/departments/add', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public list(params, done, error) {
        this.api.post(environment.billing, '/billing/departments/list', params, departments => {
            this.departments = this.control.applyRole(departments);
            done(this.departments);
        }, err => {
            error(err);
        });
    };

    public share(params, done, error) {
        this.api.post(environment.billing, '/billing/departments/share', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public update(params, done, error) {
        this.api.post(environment.billing, '/billing/departments/update', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public delete(params, done, error) {
        this.api.post(environment.billing, '/billing/departments/delete', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };

    public unsubscribe(params, done, error) {
        params.users = [this.localstorage.get('email')];
        this.api.post(environment.billing, '/billing/departments/unsubscribe', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };
}