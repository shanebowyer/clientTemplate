import { Router } from '@angular/router';
import { AdminsService } from './../../../services/admins/admins.service';
import { StoresService } from './../../../services/stores/stores.service';
import { ShareComponent } from './../../../components/share/share.component';
import { ControlService } from './../../../services/control/control.service';
import { RemoveComponent } from './../../../components/remove/remove.component';
import { UnsubscribeComponent } from './../../../components/unsubscribe/unsubscribe.component';
import { StoreEditorComponent } from './store-editor/store-editor.component';
import { StoreViewerComponent } from './store-viewer/store-viewer.component';
import { Input, OnInit, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss']
})

export class StoresComponent implements OnInit {

    constructor(private service: StoresService, private dialog: MatDialog, private control: ControlService, private router: Router, public adminsService: AdminsService) {};

    public stores:                any[]   = [];
    public message:               string  = "";
    public loading:               boolean = false;
    public displayedColumns:      any[]   = ['logo', 'description', 'storeId', 'options'];
    public storesDataSource:      any     = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;

    public back() {
        this.router.navigate(['/admin'])
    };

    private GetStores() {
        this.service.list({}, res => {
            this.stores                = res;
            this.storesDataSource      = new MatTableDataSource();
            this.storesDataSource.data = this.stores;
        }, err => {

        });
    };

    public OpenShare(store) {
        this.dialog.open(ShareComponent, {
            'width': '400px',
            'data':{
                'users':       store.users,
                'description': store.description
            },
            'disableClose': true
        }).afterClosed().subscribe(user => {
            if (typeof(user) != "undefined") {
                this.loading = true;
                this.message = "Sharing " + user.email + " To " + store.description;
                this.service.share({
                    'users':  [user],
                    'storeId': store.storeId,
                }, res => {
                    if (res.length > 0) {
                        store.users.push(user);
                    } else {
                        console.log("there was an issue sharing user");
                    };
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    public OpenViewer(store) {
        this.dialog.open(StoreViewerComponent, {
            'data': {
                'store': store
            },
            'width':        '400px',
            'disableClose': true
        });
    };

    public OpenEditor(mode, store?) {
        this.dialog.open(StoreEditorComponent, {
            'data': {
                'mode':  mode,
                'store': store || {}
            },
            'width':        '400px',
            'disableClose': true
        }).afterClosed().subscribe(store => {
            if (typeof(store) != "undefined") {
                this.loading = true;
                this.message = mode == 'add' ? "Adding store!" : "Updating store!";
                this.service[mode]({
                    'logo':             store.logo,
                    'storeId':          store.storeId,
                    'description':      store.description,
                    'organizationOnly': store.organizationOnly
                }, res => {
                    this.storesDataSource      = new MatTableDataSource();
                    this.storesDataSource.data = this.stores;
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    public OpenDelete(store) {
        this.dialog.open(RemoveComponent, {
            'width': '400px',
            'data':{
                'description': store.description
            },
            'disableClose': true
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.loading = true;
                this.message = "Busy Deleting " + store.description;
                this.service.delete({
                    'storeId': store.storeId
                }, res => {
                    this.storesDataSource      = new MatTableDataSource();
                    this.storesDataSource.data = this.stores;
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    public OpenUnsubscribe(store) {
        this.dialog.open(UnsubscribeComponent, {
            'width': '400px',
            'data':{
                'description': store.description
            },
            'disableClose': true
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.loading = true;
                this.message = "Busy Unsubscribing You Now!";
                this.service.unsubscribe({
                    'storeId': store.storeId
                }, res => {
                    this.storesDataSource      = new MatTableDataSource();
                    this.storesDataSource.data = this.stores;
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    ngOnInit() {
        if (this.control.CheckTokenEmail()) {
            this.message = "Checking Admin Credentials!";
            this.loading = true;
            this.adminsService.isAdmin()
            .then(res => {
                this.loading = false;
                if (this.adminsService.checkCredentials('viewStorePanel')) {
                    this.GetStores();
                } else {
                    this.router.navigate(['/admin']);
                };
            }, err => {
                this.loading = false;
                this.router.navigate(['/admin']);
            });
        } else {
             this.router.navigate(['/login'], {
                'queryParams': {
                    'returnToUrl': this.router.url
                }
            });
        };
    };

    ngAfterViewInit() {
        this.storesDataSource.sort = this.sort;
    };
}