import { Router } from '@angular/router';
import { CartService } from './../../services/cart/cart.service';
import { ControlService } from './../../services/control/control.service';
import { RemoveComponent } from './../../components/remove/remove.component';
import { Input, OnInit, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

    constructor(public snackBar: MatSnackBar, private router: Router, public service: CartService, private dialog: MatDialog, private control: ControlService) {};

    public cart:              any[]   = [];
    public message:           string  = "";
    public loading:           boolean = false;
    public allSelected:       boolean = false;
    public cartDataSource:    any     = new MatTableDataSource();
    public displayedColumns:  any[]   = ['select', 'description', 'unitPrice', 'quantity'];
    @ViewChild(MatSort) sort: MatSort;
    
    public back() {
        this.router.navigate(['/home'])
    };

    private GetCart() {
        this.message = "Loading Your Cart!";
        this.loading = true;
        this.service.list({}, res => {
            this.cart                = res;
            this.loading             = false;
            this.cartDataSource      = new MatTableDataSource();
            this.cartDataSource.data = this.cart;
        }, err => {
            this.cart                = [];
            this.loading             = false;
            this.cartDataSource      = new MatTableDataSource();
            this.cartDataSource.data = this.cart;
        });
    };

    public getTotal() {
        let total = 0;
        this.cartDataSource.data.forEach(row => {
            if (row.selected) {
                total += (row.quantity * row.unitPrice);
            };
        });

        return total;
    };

    public checkout() {
        let snackBarRef = this.snackBar.open('You need products selected before checkout!', null, {
            'duration': 3000
        });
    };

    public removeItem(id) {
        let data = JSON.parse(JSON.stringify(this.cartDataSource.data));
        for (var i = 0; i < data.length; ++i) {
            if (data[i].id == id) {
                data.splice(i, 1);
                break;
            };
        };
        this.cartDataSource      = new MatTableDataSource();
        this.cartDataSource.data = data;
    };

    public masterToggle() {
        if (this.isAllSelected()) {
            this.cartDataSource.data.forEach(row => {
                row.selected = false;
            });
        } else {
            this.cartDataSource.data.forEach(row => {
                row.selected = true;
            });
        };
    };

    public isAllSelected() {
        let numSelected = 0;
        let numRows     = this.cartDataSource.data.length;
        this.cartDataSource.data.forEach(row => {
            if (row.selected) {
                numSelected++;
            };
        });
        if (numSelected == numRows) {
            this.allSelected = true;
        } else {
            this.allSelected = false;
        };
        return this.allSelected;
    };

    public removeSelected() {
        let tmpData = JSON.parse(JSON.stringify(this.cartDataSource.data));
        tmpData.forEach(row => {
            if (row.selected) {
                this.removeItem(row.id);
            };
        });

        this.service.update({
            "cart": this.cartDataSource.data
        });
    };

    public changeDetected() {
        setTimeout(() => {
            this.service.update({
                "cart": this.cartDataSource.data
            });
        }, 500);
    };

    public checkSelected(el) {
        el.selected = !el.selected;
        let selectAllFound = true;
        this.cartDataSource.data.forEach(row => {
            if (!row.selected) {
                selectAllFound = false;
            };
        });
        if (selectAllFound) {
            this.allSelected = true;
        };
    };

    ngOnInit() {
        this.GetCart();
    };

    ngAfterViewInit() {
        this.cartDataSource.sort = this.sort;
    };
}