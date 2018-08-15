import { environment } from '../../../../../environments/environment';
import { FormerrorService }  from '../../../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-store-editor',
    templateUrl: './store-editor.component.html',
    styleUrls: ['./store-editor.component.scss']
})

export class StoreEditorComponent implements OnInit {

    constructor(public dialog: MatDialogRef<StoreEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService) {};

    public mode:        string = this.data.mode;
    public image:       string;
    public rules:       any[]  = environment.organizationOnly;
    public store:       any    = this.data.store;
    public storeEditorForm: FormGroup;
    public formErrors = {
        description:      '',
        organizationOnly: ''
    };
    
    public close() {
        this.dialog.close();
    };

    public submit() {
        this.dialog.close({
            'logo':             this.image,
            'storeId':          this.store.storeId,
            'description':      this.storeEditorForm.value.description,
            'organizationOnly': this.storeEditorForm.value.organizationOnly
        });
    };

    public createForm() {
        if (this.mode != "add") {
            this.image = this.store.logo;
        };
        this.storeEditorForm = new FormGroup({
            description:      new FormControl(this.mode == 'add' ? '' : this.store.description, [Validators.required]),
            organizationOnly: new FormControl(this.mode == 'add' ? 0  : this.store.organizationOnly, [Validators.required]),
        });

        this.storeEditorForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.storeEditorForm, this.formErrors, true);
        });
    };

    ngOnInit() {
        this.createForm();
    };
}