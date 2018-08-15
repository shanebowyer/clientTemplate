import { AuthService } from '../../services/auth/auth.service';
import { FormerrorService }  from '../../services/formerror/formerror.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

    constructor(public snackBar: MatSnackBar, private _formBuilder: FormBuilder, public formerror: FormerrorService, private service: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

    public image: string;
    public loading: boolean = false;
    public message: string = 'Loading';
    public isLinear = true;
    public imageIssue = false;
    public varifyForm: FormGroup;
    public inputRegistrationDetailsForm: FormGroup;
    public varifyFormErrors = {
        code:  '',
        email: ''
    };
    public registrationDetailsFormErrors = {
        email:        '',
        confirm:      '',
        password:     '',
        userName:     '',
        userSurname:  '',
        mobileNumber: ''
    };

    public login() {
        let params = this.activatedRoute.snapshot.queryParams;
        this.router.navigate(['/login'], {
            'queryParams': params
        })
    };

    public verify(stepper: MatStepper) {
        let valid = true;

        if (typeof(this.varifyForm.value.email) == "undefined") {
            valid = false;
        } else {
            this.varifyForm.value.email = this.varifyForm.value.email.trim();
        };

        if (typeof(this.varifyForm.value.code) == "undefined") {
            valid = false;
        };

        if (valid) {
            this.loading = true;
            this.message = 'Please Wait While We Verify You!';
            this.service.verify(this.varifyForm.value, res => {
                console.log(res);
                this.loading = false;
                stepper.next();
            }, err => {
                this.loading = false;
                this.snackBar.open('Could not verify You, Please check email and code!', 'OK');
                console.log(err);
            });
        };
    };

    public register(stepper: MatStepper) {
        let valid = true;

        if (typeof(this.image) != "undefined") {
            this.inputRegistrationDetailsForm.value.profilePic  = this.image;
        } else {
            valid           = false;
            this.imageIssue = true;
        };

        if (this.inputRegistrationDetailsForm.value.password != this.inputRegistrationDetailsForm.value.confirm) { 
            valid = false;
        };

        this.inputRegistrationDetailsForm.value.email       = this.inputRegistrationDetailsForm.value.email.trim();
        this.inputRegistrationDetailsForm.value.userName    = this.inputRegistrationDetailsForm.value.userName.trim();
        this.inputRegistrationDetailsForm.value.userSurname = this.inputRegistrationDetailsForm.value.userSurname.trim();

        if (valid) {
            this.loading = true;
            this.message = 'You Are Being Registered!';
            this.service.register(this.inputRegistrationDetailsForm.value, res => {
                console.log(res);
                this.varifyForm.value.email = this.inputRegistrationDetailsForm.value.email;
                this.loading = false;
                stepper.next();
            }, err => {
                let errorMessage = 'There was an error adding you!';
                this.loading = false;
                switch (err.errors[0].code) {
                    case("70"):
                        errorMessage = 'A user for this email already exists!';
                        break;
                };

                this.snackBar.open(errorMessage, 'OK');
            });
        };
    };

    public passwordStrength(value) {
        let answer = '';
        if (value == 0) { 
            answer = '';
        } else if (value <= 8) {
            answer = 'weak';
        } else if (value <= 12) {
            answer = 'medium';
        } else if (value <= 16) {
            answer = 'strong';
        } else if (value <= 25) {
            answer = 'very strong';
        } else if (value > 25) {
            answer = "my goodness, no one's hacking you!";
        };

        return answer;
    };

    public passwordStrengthColor(value) {
        let answer = '';
        if (value <= 8) {
            answer = 'weak';
        } else if (value <= 12) {
            answer = 'medium';
        } else if (value <= 16) {
            answer = 'strong';
        } else if (value <= 25) {
            answer = 'verystrong';
        } else if (value > 25) {
            answer = 'verystrong';
        };

        return answer;
    };

    ngOnInit() {
        this.inputRegistrationDetailsForm = this._formBuilder.group({
            'email':        new FormControl('', [Validators.email, Validators.required]),
            'confirm':      new FormControl('', [Validators.required]),
            'password':     new FormControl('', [Validators.required]),
            'userName':     new FormControl('', [Validators.required]),
            'userSurname':  new FormControl('', [Validators.required]),
            'mobileNumber': new FormControl('', [Validators.required])
        });

        this.inputRegistrationDetailsForm.valueChanges.subscribe((value) => {
            if (value.email.length >= 0) {
                value.email = value.email.toLowerCase().trim();
            };
            if (value.userName.length >= 0) {
                value.userName = value.userName.replace(/\b\w/g, l => value.userName.toUpperCase());
            };
            if (value.userSurname.length >= 0) {
                value.userSurname = value.userSurname.replace(/\b\w/g, l => value.userSurname.toUpperCase());
            };
            this.registrationDetailsFormErrors = this.formerror.validateForm(this.inputRegistrationDetailsForm, this.registrationDetailsFormErrors, true);
        });

        this.varifyForm = this._formBuilder.group({
            'code':  new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
            'email': new FormControl('', [Validators.email, Validators.required]),
        });

        this.varifyForm.valueChanges.subscribe((value) => {
            if (value.email.length >= 0) {
                value.email = value.email.toLowerCase().trim();
            };
            this.varifyFormErrors = this.formerror.validateForm(this.varifyForm, this.varifyFormErrors, true);
        });
    };
}