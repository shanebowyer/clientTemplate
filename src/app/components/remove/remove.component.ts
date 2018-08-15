import { environment } from '../../../environments/environment';
import { FormerrorService }  from '../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss']
})

export class RemoveComponent implements OnInit {
    
    constructor(public remove: MatDialogRef<RemoveComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {}
    
    public roles: any = environment.roles;
    public removeForm: FormGroup;
    public formErrors = {
        confirm: ''
    };
    public options: any = [{
        'value':       true,
        'description': "Yes, Delete " + this.data.description
    },{
        'value':       false,
        'description': "No, Don't Delete " + this.data.description
    }];
    
    public close() {
        this.remove.close();
    };

    public submit() {
        this.remove.close(this.removeForm.value.confirm);
    };

    ngOnInit() {
        this.createForm();
    };

    public createForm() {
        this.removeForm = new FormGroup({
            confirm: new FormControl(false, Validators.required),
        });

        this.removeForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.removeForm, this.formErrors, true);
        });
    };
}