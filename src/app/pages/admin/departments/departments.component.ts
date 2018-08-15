import { Router } from '@angular/router';
import { AdminsService } from './../../../services/admins/admins.service';
import { ShareComponent } from './../../../components/share/share.component';
import { ControlService } from './../../../services/control/control.service';
import { RemoveComponent } from './../../../components/remove/remove.component';
import { DepartmentsService } from './../../../services/departments/departments.service';
import { UnsubscribeComponent } from './../../../components/unsubscribe/unsubscribe.component';
import { DepartmentEditorComponent } from './department-editor/department-editor.component';
import { DepartmentViewerComponent } from './department-viewer/department-viewer.component';
import { Input, OnInit, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})

export class DepartmentsComponent implements OnInit {

    constructor(private service: DepartmentsService, private dialog: MatDialog, private control: ControlService, private router: Router, public adminsService: AdminsService) {};

    public message:               string  = "";
    public loading:               boolean = false;
    public departments:           any[]   = [];
    public displayedColumns:      any[]   = ['departmentId', 'description', 'options'];
    public departmentsDataSource: any     = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;

    public back() {
        this.router.navigate(['/admin'])
    };

    public OpenShare(department) {
        this.dialog.open(ShareComponent, {
            'width': '400px',
            'data':{
                'users':       department.users,
                'description': department.description
            },
            'disableClose': true
        }).afterClosed().subscribe(user => {
            if (typeof(user) != "undefined") {
                this.loading = true;
                this.message = "Sharing " + user.email + " To " + department.description;
                this.service.share({
                    'users':  [user],
                    'departmentId': department.departmentId,
                }, res => {
                    if (res.length > 0) {
                        department.users.push(user);
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

    public OpenViewer(department) {
        this.dialog.open(DepartmentViewerComponent, {
            'data': {
                'department': department
            },
            'width':        '400px',
            'disableClose': true
        });
    };

    public OpenEditor(mode, department?) {
        this.dialog.open(DepartmentEditorComponent, {
            'data': {
                'mode':       mode,
                'department': department || {}
            },
            'width':        '400px',
            'disableClose': true
        }).afterClosed().subscribe(department => {
            if (typeof(department) != "undefined") {
                this.loading = true;
                this.message = mode == 'add' ? "Adding Department!" : "Updating Department!";
                this.service[mode]({
                    'description':      department.description,
                    'departmentId':     department.departmentId,
                    'organizationOnly': department.organizationOnly
                }, res => {
                    if (mode == 'add') {
                        department.role = 4;
                        this.departments.push(department);
                    } else {
                        this.departments.map(o => {
                            if (o.departmentId == department.departmentId) {
                                o.description      = department.description;
                                o.organizationOnly = department.organizationOnly;
                            };
                        });
                    };
                    this.departmentsDataSource      = new MatTableDataSource();
                    this.departmentsDataSource.data = this.departments;
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    public OpenDelete(department) {
        this.dialog.open(RemoveComponent, {
            'width': '400px',
            'data':{
                'description': department.description
            },
            'disableClose': true
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.loading = true;
                this.message = "Busy Deleting " + department.description;
                this.service.delete({
                    'departmentId': department.departmentId
                }, res => {
                    if (res.rowsDeleted > 0) {
                        for (var i = 0; i < this.departments.length; ++i) {
                             if (this.departments[i].departmentId == department.departmentId) {
                                this.departments.splice(i, 1);
                                break;
                            };
                        };
                        this.departmentsDataSource      = new MatTableDataSource();
                        this.departmentsDataSource.data = this.departments;
                    } else {
                        console.log("there was an issue deleting department");
                    };
                    this.loading = false;
                }, err => {
                    this.loading = false;
                    console.log(err.errors[0]);
                });
            };
        });
    };

    private GetDepartments() {
        this.service.list({}, res => {
            this.departments                = res;
            this.departmentsDataSource      = new MatTableDataSource();
            this.departmentsDataSource.data = this.departments;
        }, err => {

        });
    };

    public OpenUnsubscribe(department) {
        this.dialog.open(UnsubscribeComponent, {
            'width': '400px',
            'data':{
                'description': department.description
            },
            'disableClose': true
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.loading = true;
                this.message = "Busy Unsubscribing You Now!";
                this.service.unsubscribe({
                    'departmentId': department.departmentId
                }, res => {
                    if (res.length > 0) {
                        for (var i = 0; i < this.departments.length; ++i) {
                             if (this.departments[i].departmentId == department.departmentId) {
                                this.departments.splice(i, 1);
                                console.log("You were Unsubscribed!");
                                break;
                            };
                        };
                        this.departmentsDataSource      = new MatTableDataSource();
                        this.departmentsDataSource.data = this.departments;
                    } else {
                        console.log("there was an issue unsubscribing you");
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
        this.message = "Checking Admin Credentials!";
        this.loading = true;
        this.adminsService.isAdmin()
        .then(res => {
            this.loading = false;
            if (this.adminsService.checkCredentials('viewDepartmentPanel')) {
                this.GetDepartments();
            } else {
                this.router.navigate(['/admin']);
            };
        }, err => {
            this.loading = false;
            this.router.navigate(['/admin']);
        });
    };

    ngAfterViewInit() {
        this.departmentsDataSource.sort = this.sort;
    };
}