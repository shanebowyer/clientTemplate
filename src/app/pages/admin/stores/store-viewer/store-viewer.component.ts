import { environment } from '../../../../../environments/environment';
import { OnInit, Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-store-viewer',
    templateUrl: './store-viewer.component.html',
    styleUrls: ['./store-viewer.component.scss']
})

export class StoreViewerComponent implements OnInit {

    constructor(public dialog: MatDialogRef<StoreViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {};

    public rules:  any[] = environment.organizationOnly;
    public roles:  any[] = environment.roles;
    public store:  any   = this.data.store;
    
    public close() {
        this.dialog.close();
    };

    ngOnInit() {
        this.rules.map(rule => {
            if (rule.value == this.store.organizationOnly) {
                this.store.sharingRules = rule.description;
            };
        });
    };
}