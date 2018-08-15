import { Router } from '@angular/router';
import { AuthService }  from '../../services/auth/auth.service';
import { ControlService }  from '../../services/control/control.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'account-button',
    templateUrl: './account-button.component.html',
    styleUrls: ['./account-button.component.scss']
})

export class AccountButtonComponent implements OnInit {

    constructor(private router: Router, private control: ControlService, private service: AuthService) {};
    
    public user:       any     = {};
    public loading:    boolean = false;
    public loggedIn:   boolean = false;
    public checkLogin: any;

    public submit(loggedIn) {
        if (loggedIn) { 
            this.router.navigate(['/account']);
        } else if (!this.loading) {
            this.router.navigate(['/login'], {
                'queryParams': {
                    'returnToUrl': this.router.url
                }
            });
        };
    };

    ngOnInit() {
        this.checkLogin = setInterval(() => {
            if (this.control.CheckTokenEmailScopes()) {
                this.loading  = true;
                this.loggedIn = true;
                this.service.getUser({}, res => {
                    this.user    = res[0];
                    this.loading = false;
                    clearInterval(this.checkLogin);
                }, err => {
                    this.loading = false;
                });
            };
        }, 1000);
    };
}