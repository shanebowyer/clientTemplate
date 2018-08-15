import { environment } from '../../../../../environments/environment';
import { OnInit, Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-admins-viewer',
    templateUrl: './admins-viewer.component.html',
    styleUrls: ['./admins-viewer.component.scss']
})

export class AdminsViewerComponent implements OnInit {

    constructor(public dialog: MatDialogRef<AdminsViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {};

    public admin: any = this.data.admin;
    
    public close() {
        this.dialog.close();
    };

    ngOnInit() {
        
    };
}