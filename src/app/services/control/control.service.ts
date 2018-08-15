import { Injectable } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Injectable()

export class ControlService {

    constructor(public localstorage: LocalstorageService) {};
    
    private email: any = this.localstorage.get("email");
    private token: any = this.localstorage.get("token");

    public applyRole(result) {
        this.email = this.localstorage.get("email");
        result.map(o => {
            if (typeof(o.users) != "undefined") {
                o.users.map(user => {
                    if (user.email == this.email) {
                        o.role = user.role;
                    };
                });
            } else {
                o.role = 0;
            };
        });

        return result;
    };

    public CheckTokenEmail() {
        this.email = this.localstorage.get("email");
        this.token = this.localstorage.getObject("token");

        let now   = new Date();
        let valid = true;

        if (!this.email || !this.token) {
            valid = false;
        } else {
            let expiry = new Date(this.token.expiry);
            if (expiry < now) {
                valid = false;
            };
        };

        return valid;
    };

    public CheckTokenEmailScopes() {
        this.email = this.localstorage.get("email");
        this.token = this.localstorage.getObject("token");

        let now   = new Date();
        let valid = true;

        if (!this.email || !this.token) {
            valid = false;
        } else {
            let expiry = new Date(this.token.expiry);
            if (expiry < now) {
                valid = false;
            };
            if (this.token.scopes) {
                if (this.token.scopes.length <= 1) {
                    valid = false;
                };
            } else {
                valid = false;
            };
        };

        return valid;
    };
}