import { environment } from '../../../../../environments/environment';
import { OnInit, Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-department-viewer',
    templateUrl: './department-viewer.component.html',
    styleUrls: ['./department-viewer.component.scss']
})

export class DepartmentViewerComponent implements OnInit {

    constructor(public dialog: MatDialogRef<DepartmentViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {};

    public rules:       any[]  = environment.organizationOnly;
    public roles:       any[]  = environment.roles;
    public department:  any    = this.data.department;
    
    public close() {
        this.dialog.close();
    };

    ngOnInit() {
        this.rules.map(rule => {
            if (rule.value == this.department.organizationOnly) {
                this.department.sharingRules = rule.description;
            };
        });
    };
}