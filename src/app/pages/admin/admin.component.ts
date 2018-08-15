import { Router } from '@angular/router';
import { AdminsService } from './../../services/admins/admins.service';
import { ControlService } from './../../services/control/control.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

    constructor(private router: Router, private control: ControlService, private service: AdminsService) {};

    public message: string  = "";
    public loading: boolean = false;

    public back() {
        this.router.navigate(['/home'])
    };

    public OpenAdminManager() {
        this.router.navigate(['/admin/admins']);
    };

    public OpenStoreManager() {
        this.router.navigate(['/admin/stores']);
    };

    public OpenDepartmentManager() {
        this.router.navigate(['/admin/departments']);
    };

    ngOnInit() {
        if (this.control.CheckTokenEmail()) {
            this.message = "Checking Admin Credentials!";
            this.loading = true;
            this.service.isAdmin()
            .then(res => {
                this.loading = false;
                if (this.service.checkCredentials('viewMainAdminPanel')) {

                } else {
                    this.router.navigate(['/home']);
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
}