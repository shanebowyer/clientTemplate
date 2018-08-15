import { environment } from '../../../../../environments/environment';
import { FormerrorService }  from '../../../../services/formerror/formerror.service';
import { OnInit, Inject, ViewChild, Component, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-admins-editor',
    templateUrl: './admins-editor.component.html',
    styleUrls: ['./admins-editor.component.scss']
})

export class AdminsEditorComponent implements OnInit {

    constructor(public dialog: MatDialogRef<AdminsEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {};

    public mode:            string = this.data.mode;
    public roles:           any[]  = environment.adminRoles;
    public admin:           any    = this.data.admin;
    public adminEditorForm: FormGroup;
    public formErrors = {
        'email': ''
    };
    @ViewChild('list') list: ElementRef;
    
    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close({
            'roles':   this.admin.roles,
            'email':   this.adminEditorForm.value.email,
            'adminId': this.admin.adminId
        });
    };
    
    public createForm() {
        this.adminEditorForm = new FormGroup({
            'email': new FormControl(this.mode == 'add' ? '' : this.admin.email, [Validators.required, Validators.email])
        });

        this.adminEditorForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.adminEditorForm, this.formErrors, true);
        });
    };

    ngOnInit() {
        this.createForm();
        
        if (this.mode == 'add') {
            this.admin.roles = [];
        };

        this.roles.map(role => {
            let roleFound = false;
            this.admin.roles.map(adRole => {
                if (adRole.role == role.role) {
                    roleFound          = true;
                    adRole.description = role.description;
                };
            });
            if (!roleFound) {
                this.admin.roles.push(role);
            };
        });
    };
}