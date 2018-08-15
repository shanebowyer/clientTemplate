import { environment } from '../../../environments/environment';
import { FormerrorService }  from '../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss']
})

export class ShareComponent implements OnInit {
    
    constructor(public share: MatDialogRef<ShareComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {}
    
    public roles: any = environment.roles;
    public shareForm: FormGroup;
    public formErrors = {
        'role':  '',
        'email': ''
    };
    
    public close() {
        this.share.close();
    };

    public submit() {
        this.share.close({
            'role':  this.shareForm.value.role,
            'email': this.shareForm.value.email
        });
    };

    ngOnInit() {
        this.createForm();
    };

    public createForm() {
        this.shareForm = new FormGroup({
            'role':  new FormControl(1, [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
        });

        this.shareForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.shareForm, this.formErrors, true);
        });
    };
}