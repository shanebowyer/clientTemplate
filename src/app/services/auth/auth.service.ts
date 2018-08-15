import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';

@Injectable()

export class AuthService {
    
    time:  any;
    email: string;
    token: string;

    constructor(public api: ApiService, public localstorage: LocalstorageService, private router: Router) {};

    public getUser(params, done, error) {
        this.api.post(environment.auth, '/users/list', params, users => {
            done(users);
        }, err => {
            error(err);
        });
    };

    public logout() {
        this.localstorage.clear();
        this.router.navigate(['/login']);
    };

   public verify(params, done, error) {
        return new Promise((resolve, reject) => {
            this.email = params.email;
            this.localstorage.set('email', this.email);
            params.clientId    = environment.clientIdAuth;
            params.description = environment.appName;

            this.api.put(environment.auth, '/auth/verify', params, res => {
                done(res);
            }, err => {
                error(err);
            });
        });
    };

    public register(params, done, error) {
        return new Promise((resolve, reject) => {
            this.email = params.email;
            this.localstorage.set('email', this.email);
            params.clientId    = environment.clientIdAuth;
            params.description = environment.appName;

            this.api.put(environment.auth, '/auth/register', params, res => {
                done(res);
            }, err => {
                error(err);
            });
        });
    };

    public allowaccess() {
        return new Promise((resolve, reject) => {
            this.time = new Date();
            this.time.setDate(this.time.getDate() + 1000);
            this.api.post(environment.auth, '/auth/allowaccess', {
                'expiry':       this.time,
                'scopes':       environment.scopes,
                'clientId':     environment.clientIdAuth,
                'tokenAddOn':   {},
                'description':  environment.appName
            }, res => {
                this.token = res[0].token;
                this.localstorage.setObject('token', this.token);
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    };
    
    public authenticate(params) {
        return new Promise((resolve, reject) => {
            this.email = params.email;
            this.localstorage.set('email', this.email);
            params.clientId    = environment.clientIdAuth;
            params.description = environment.appName;

            this.api.put(environment.auth, '/auth/authenticate', params, res => {
                this.token = res[0].token;
                this.localstorage.setObject('token', this.token);
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    };

    public forgotPassword(params, done, error) {
        this.localstorage.set('email', params.email);
        params.clientId    = environment.clientIdAuth;
        params.description = environment.appName;

        this.api.put(environment.auth, '/auth/resetpassword', params, res => {
            done(res);
        }, err => {
            error(err);
        });
    };
}
