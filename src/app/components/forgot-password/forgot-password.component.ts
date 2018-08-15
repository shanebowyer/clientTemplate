import { FormerrorService }  from '../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
    
    constructor(public forgot: MatDialogRef<ForgotPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {}
    
    public forgotPasswordForm: FormGroup;
    public formErrors = {
        email: ''
    };
    
    public close() {
        this.forgot.close();
    };

    public submit() {
        this.forgot.close(this.forgotPasswordForm.value.email);
    };

    ngOnInit() {
        this.createForm();
    };

    public createForm() {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });

        this.forgotPasswordForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.forgotPasswordForm, this.formErrors, true);
        });
    };
}