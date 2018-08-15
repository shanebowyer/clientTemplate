import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { AdminsService } from './services/admins/admins.service';
import { ControlService } from './services/control/control.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    constructor(private router: Router, private service: AuthService, private adminService: AdminsService, private control: ControlService) {};

    private checkLogin:       any;
    private departments               = 1;
    public  showAdminConsole: boolean = false;

    public home() {
        this.router.navigate(['/home']);
    };

    public OpenAdminConsole() {
        this.router.navigate(['/admin']);
    };

    public OpenStore() {
        this.router.navigate(['/mystores']);
    };

    public OpenCart() {
        this.router.navigate(['/cart']);
    };

    public OpenWishList() {
        this.router.navigate(['/wishlist']);
    };

    public logout() {
        this.service.logout();
    };

    public ShowBackButton() {
        if (this.router.url.length > 1) {
            if (this.router.url.substring(0, 9) == "/eporty/") {
                return true;
            };
        };
        return false;
    };

    public showShopHeader() {
        if (this.router.url.length > 1) {
            if (this.router.url.substring(0, 5) == "/home") {
                return true;
            };
        };
        return false;
    };

    ngOnInit() {
        this.checkLogin = setInterval(() => {
            if (this.control.CheckTokenEmailScopes()) {
                clearInterval(this.checkLogin);
                 this.adminService.isAdmin()
                .then(res => {
                    if (this.adminService.checkCredentials('viewMainAdminPanel')) {
                        this.showAdminConsole = true;
                    };
                }, err => {});
            };
        }, 1000);
    };
}