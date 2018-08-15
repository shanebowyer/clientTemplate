import { environment } from '../../../../../environments/environment';
import { FormerrorService }  from '../../../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-department-editor',
    templateUrl: './department-editor.component.html',
    styleUrls: ['./department-editor.component.scss']
})

export class DepartmentEditorComponent implements OnInit {

    constructor(public dialog: MatDialogRef<DepartmentEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {};

    public mode:        string = this.data.mode;
    public rules:       any[]  = environment.organizationOnly;
    public department:  any    = this.data.department;
    public departmentEditorForm: FormGroup;
    public formErrors = {
        description:      '',
        departmentId:     '',
        organizationOnly: ''
    };
    
    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close({
            'description':      this.departmentEditorForm.value.description,
            'departmentId':     this.mode == 'add' ? this.departmentEditorForm.value.departmentId : this.department.departmentId,
            'organizationOnly': this.departmentEditorForm.value.organizationOnly
        });
    };

    public createForm() {
        this.departmentEditorForm = new FormGroup({
            description:      new FormControl(this.mode == 'add' ? '' : this.department.description, [Validators.required]),
            departmentId:     new FormControl(this.mode == 'add' ? '' : this.department.departmentId, [Validators.required, Validators.minLength(24), Validators.maxLength(24)]),
            organizationOnly: new FormControl(this.mode == 'add' ? 0  : this.department.organizationOnly, [Validators.required]),
        });

        this.departmentEditorForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.departmentEditorForm, this.formErrors, true);
        });
    };

    ngOnInit() {
        this.createForm();
    };
}