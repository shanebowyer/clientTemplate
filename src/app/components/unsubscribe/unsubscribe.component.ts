import { environment } from '../../../environments/environment';
import { FormerrorService }  from '../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})

export class UnsubscribeComponent implements OnInit {
    
    constructor(public unsubscribe: MatDialogRef<UnsubscribeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {}
    
    public roles: any = environment.roles;
    public unsubscribeForm: FormGroup;
    public formErrors = {
        confirm: ''
    };
    public options: any = [{
        'value':       true,
        'description': 'Yes, Unsubscribe Me Now!'
    },{
        'value':       false,
        'description': 'No, Dont Unsubscribe Me!'
    }];
    
    public close() {
        this.unsubscribe.close();
    };

    public submit() {
        this.unsubscribe.close(this.unsubscribeForm.value.confirm);
    };

    ngOnInit() {
        this.createForm();
    };

    public createForm() {
        this.unsubscribeForm = new FormGroup({
            confirm: new FormControl(false, Validators.required),
        });

        this.unsubscribeForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.unsubscribeForm, this.formErrors, true);
        });
    };
}