import { environment } from '../../../../environments/environment';
import { ProductsService }  from '../../../services/products/products.service';
import { FormerrorService }  from '../../../services/formerror/formerror.service';
import { DepartmentsService }  from '../../../services/departments/departments.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
@Component({
    selector: 'app-product-editor',
    templateUrl: './product-editor.component.html',
    styleUrls: ['./product-editor.component.scss']
})

export class ProductEditorComponent implements OnInit {
    
    constructor(public editor: MatDialogRef<ProductEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public formerror: FormerrorService, private service: DepartmentsService) {};
    
    public mode:        string = this.data.mode;
    public roles:       any[]  = environment.roles;
    public image:       string = "";
    public product:     any    = JSON.parse(JSON.stringify(this.data.product));
    public editorForm:  FormGroup;
    public formErrors:  any    = {
        'title':            '',
        'description':      '',
        'organizationOnly': ''
    };
    public departments:      any[] = [];
    public organizationOnly: any[] = environment.organizationOnly;
    
    public close() {
        this.editor.close();
    };

    public submit() {
        this.product.title            = this.editorForm.value.title;
        this.product.mainImage        = this.image;
        this.product.description      = this.editorForm.value.description;
        this.product.departments      = this.editorForm.value.departments;
        this.product.organizationOnly = this.editorForm.value.organizationOnly;
        this.editor.close(this.product);
    };

    public createForm() {
        this.image = this.product.mainImage;
        this.editorForm = new FormGroup({
            'price':            new FormControl((this.mode == 'add' ? 0 : this.product.price), [Validators.required]),
            'title':            new FormControl((this.mode == 'add' ? 0 : this.product.title), [Validators.required]),
            'description':      new FormControl((this.mode == 'add' ? '' : this.product.description), [Validators.required]),
            'departments':      new FormControl((this.mode == 'add' ? '' : this.product.departments), [Validators.required]),
            'organizationOnly': new FormControl((this.mode == 'add' ? 0 : this.product.organizationOnly), [Validators.required])
        });

        this.editorForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.editorForm, this.formErrors, true);
        });
    };

    public imageChangeEvent($event) {
        console.log($event)
    };

    public GetDepartments() {
        this.service.list({
            'filter': ['description', 'departmentId']
        }, res => {
            this.departments = res;
        }, err => {
            this.departments = [];
        });
    };

    ngOnInit() {
        this.createForm();
        this.GetDepartments();
    };
}