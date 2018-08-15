import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    time:     any;
    user = {
        'email':       '',
        'clientId':    '',
        'password':    '',
        'description': ''
    };
    message: string;
    loading: boolean;
    
    constructor (public snackBar: MatSnackBar, public service: AuthService, public router: Router, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {};

    public login() {
        this.loading = true;
        this.message = "Checking Your Credentials!";

        this.service.authenticate(this.user)
        .then(result => {
            return new Promise((resolve, reject) => {
                this.message = "Allowing You Access Now!";
                resolve(result);
            });
        })
        .then(result => this.service.allowaccess())
        .then(result => {
            this.loading = false;
            let params = this.activatedRoute.snapshot.queryParams;
            if (params.returnToUrl) {
                this.router.navigate([params.returnToUrl]);
            } else {
                this.router.navigate(['/home']);
            };
        })
        .catch(error => {
            this.loading = false;
            console.log("error: ", error)
        });
    };

    public forgotPassword() {
        this.dialog.open(ForgotPasswordComponent, {
            'width':        '400px',
            'disableClose': true
        }).afterClosed().subscribe(email => {
            if (typeof(email) != "undefined") {
                this.loading = true;
                this.message = "Resetting Your Password!";

                this.service.forgotPassword({
                    'email': email
                }, res => {
                    this.snackBar.open('Check Your Email', 'Ok');
                    this.loading    = false;
                    this.user.email = email;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    public OpenRegister() {
        let params = this.activatedRoute.snapshot.queryParams;
        this.router.navigate(['/register'], {
            'queryParams': params
        })
    };
}