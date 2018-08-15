import { Router } from '@angular/router';
import { AdminsService } from './../../services/admins/admins.service';
import { StoresService } from './../../services/stores/stores.service';
import { ShareComponent } from './../../components/share/share.component';
import { ControlService } from './../../services/control/control.service';
import { RemoveComponent } from './../../components/remove/remove.component';
import { UnsubscribeComponent } from './../../components/unsubscribe/unsubscribe.component';
import { Input, OnInit, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-my-stores',
    templateUrl: './my-stores.component.html',
    styleUrls: ['./my-stores.component.scss']
})

export class MyStoresComponent implements OnInit {

    constructor(private service: StoresService, private dialog: MatDialog, private control: ControlService, private router: Router, public adminsService: AdminsService) {};

    public stores:                any[]   = [];
    public message:               string  = "";
    public loading:               boolean = false;
    public displayedColumns:      any[]   = ['logo', 'description', 'storeId', 'options'];
    public storesDataSource:      any     = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;

    public back() {
        this.router.navigate(['/home'])
    };

    private GetStores() {
        this.service.list({}, res => {
            this.stores                = res;
            this.storesDataSource      = new MatTableDataSource();
            this.storesDataSource.data = this.stores;
        }, err => {

        });
    };


    public ManageProducts(store) {
        this.router.navigate(['/mystores/' + store.storeId + '/products'])
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