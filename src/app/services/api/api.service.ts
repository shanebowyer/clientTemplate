import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalstorageService }  from '../../services/localstorage/localstorage.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ApiService {
    constructor(public http: Http, public router: Router, public localstorage: LocalstorageService) {}

    email: string;
    token: string;

    put(url, endpoint, payload, done, error) {
        this.email = this.localstorage.get('email');

        if (typeof(this.email) == "undefined") {
            this.localstorage.clear();
            this.router.navigate(['/login'])
        };
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({
            'headers': headers
        });

        const DTO  = payload;
        DTO.header = {
           'email':         this.email,
           'clientIdAuth':  environment.clientIdAuth
        };
        
        this.http.put(url + endpoint, JSON.stringify(DTO), options)
        .toPromise()
        .then((res: Response) => {
            done(res.json());
        })
        .catch((err: Response) => {
            error(err.json());
        });
    };

    post(url, endpoint, payload, done, error) {
        this.email = this.localstorage.get('email');
        this.token = this.localstorage.get('token');

        if (typeof(this.token) == "undefined" || (typeof(this.email) == "undefined")) {
            this.localstorage.clear();
            this.router.navigate(['/login'])
        };
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);

        const options = new RequestOptions({
            'headers': headers
        });

        const DTO  = payload;
        DTO.header = {
           'email':         this.email,
           'clientIdAuth':  environment.clientIdAuth
        };
        
        this.http.post(url + endpoint, JSON.stringify(DTO), options)
        .toPromise()
        .then((res: Response) => {
            done(res.json());
        })
        .catch((err: Response) => {
            if (err.json().errors[0].code == 401) {
                this.localstorage.clear();
                this.router.navigate(['/login']);
            };
            
            error(err.json());
        });
    };

    test(url, payload, done, error) {
        const headers = new Headers();
        headers.append('accept', '*/*');
        headers.append('Content-Type', 'application/x-www-form-urlencoded;');
        headers.append('Access-Control-Allow-Origin', '*');
        
        const options = new RequestOptions({
            'headers': headers
        });

        this.http.post(url, JSON.stringify(payload), options)
        .toPromise()
        .then((res: Response) => {
            debugger
            done(res.json());
        })
        .catch((err: Response) => {
            debugger
            error(err.json());
        });
    };
}