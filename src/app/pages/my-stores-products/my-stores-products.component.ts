import { AdminsService } from './../../services/admins/admins.service';
import { ShareComponent } from './../../components/share/share.component';
import { ControlService } from './../../services/control/control.service';
import { ProductsService } from './../../services/products/products.service';
import { RemoveComponent } from './../../components/remove/remove.component';
import { UnsubscribeComponent } from './../../components/unsubscribe/unsubscribe.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Input, OnInit, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-my-stores-products',
    templateUrl: './my-stores-products.component.html',
    styleUrls: ['./my-stores-products.component.scss']
})

export class MyStoresProductsComponent implements OnInit {

    constructor(private service: ProductsService, private dialog: MatDialog, private control: ControlService, private router: Router, public adminsService: AdminsService, private route: ActivatedRoute) {};

    public store:                 any     = {
        'description': 'My Test Store'
    };
    public message:               string  = "";
    public loading:               boolean = false;
    public products:              any[]   = [];
    public displayedColumns:      any[]   = ['logo', 'title', 'productId', 'options'];
    public productsDataSource:    any     = new MatTableDataSource();
    @ViewChild(MatSort) sort:     MatSort;

    public back() {
        this.router.navigate(['/home'])
    };

    private GetProducts() {
        this.route.params.subscribe(params => {
            if (typeof(params.storeId) != 'undefined' && params.storeId != '') {
                this.service.list({
                    'filter':  ['users', 'title', 'productId', 'mainImage', 'organizationOnly'],
                    'storeId': params.storeId
                }, res => {
                    this.products                = res;
                    this.productsDataSource      = new MatTableDataSource();
                    this.productsDataSource.data = this.products;
                }, err => {

                });
            };
        });
    };

    private openEditorDialog(mode, product) {
        this.dialog.open(ProductEditorComponent, {
            'width': '50vw',
            'data':{
                'mode':    mode,
                'product': product || {}
            },
            'disableClose': true
        }).afterClosed().subscribe(params => {
            if (typeof(params) != "undefined") {
                if (mode == 'add') { 
                    this.message = "Adding your product!";
                } else {
                    this.message = "Updating your product!";
                };
                this.loading = true;
                this.service[mode](params, res => {
                    this.loading = false;
                }, err => {
                    this.loading = false;
                });
            };
        });
    };

    public OpenEditor(mode, product?) {
        if (mode == 'add') {
            this.openEditorDialog(mode, {})
        } else {
            this.service.list({
                'productId': product.productId
            }, res => {
                this.openEditorDialog(mode, res[0]);
            }, err => {

            });
        };
    };

    ngOnInit() {
        if (this.control.CheckTokenEmail()) {
            this.message = "Checking Admin Credentials!";
            this.loading = true;
            this.adminsService.isAdmin()
            .then(res => {
                this.loading = false;
                if (this.adminsService.checkCredentials('viewStorePanel')) {
                    this.GetProducts();
                } else {
                    this.router.navigate(['/mystores']);
                };
            }, err => {
                this.loading = false;
                this.router.navigate(['/mystores']);
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
        this.productsDataSource.sort = this.sort;
    };
}