import { Router } from '@angular/router';
import { ControlService } from './../../../services/control/control.service';
import { RemoveComponent } from './../../../components/remove/remove.component';
import { AdminsService } from './../../../services/admins/admins.service';
import { AdminsEditorComponent } from './admins-editor/admins-editor.component';
import { AdminsViewerComponent } from './admins-viewer/admins-viewer.component';
import { Input, OnInit, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss']
})

export class AdminsComponent implements OnInit {
    constructor(private router: Router, public service: AdminsService, private dialog: MatDialog, private control: ControlService) {};

    public admins:            any[]   = [];
    public message:           string  = "";
    public loading:           boolean = false;
    public displayedColumns:  any[]   = ['email', 'adminId', 'options'];
    public adminsDataSource:  any     = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    
    public back() {
        this.router.navigate(['/admin'])
    };

    private GetAdmins() {
        this.message = "Checking Admin Credentials!";
        this.loading = true;
        this.service.list({
            'filter': ['email', 'roles', 'adminId']
        }, res => {
            this.admins                = res;
            this.adminsDataSource      = new MatTableDataSource();
            this.adminsDataSource.data = this.admins;
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    };

    public OpenViewer(admin) {
        this.dialog.open(AdminsViewerComponent, {
            'data': {
                'admin': admin
            },
            'width':        '400px',
            'disableClose': true
        });
    };

    public OpenEditor(mode, admin?) {
        this.dialog.open(AdminsEditorComponent, {
            'data': {
                'mode':  mode,
                'admin': admin || {}
            },
            'width':        '400px',
            'disableClose': true
        }).afterClosed().subscribe(admin => {
            if (typeof(admin) != "undefined") {
                this.loading = true;
                this.message = mode == 'add' ? "Adding admin!" : "Updating admin!";
                this.service[mode]({
                    'roles':   admin.roles,
                    'email':   admin.email,
                    'adminId': admin.adminId
                }, res => {
                    this.adminsDataSource      = new MatTableDataSource();
                    this.adminsDataSource.data = this.admins;
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    public OpenDelete(admin) {
        this.dialog.open(RemoveComponent, {
            'width': '400px',
            'data':{
                'description': admin.email
            },
            'disableClose': true
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.loading = true;
                this.message = "Busy Deleting " + admin.email;
                this.service.delete({
                    'adminId': admin.adminId
                }, res => {
                    if (res.rowsDeleted > 0) {
                        for (var i = 0; i < this.admins.length; ++i) {
                             if (this.admins[i].adminId == admin.adminId) {
                                this.admins.splice(i, 1);
                                break;
                            };
                        };
                        this.adminsDataSource      = new MatTableDataSource();
                        this.adminsDataSource.data = this.admins;
                    } else {
                        console.log("there was an issue deleting admin");
                    };
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
            this.service.isAdmin()
            .then(res => {
                this.loading = false;
                if (!this.service.checkCredentials('viewAdminPanel')) {
                    this.router.navigate(['/admin']);
                } else {
                    this.GetAdmins();
                };
            }, err => {
                this.loading = false;
                this.router.navigate(['/home']);
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
        this.adminsDataSource.sort = this.sort;
    };
}