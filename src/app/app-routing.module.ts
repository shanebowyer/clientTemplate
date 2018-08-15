import { NgModule } from '@angular/core';
import { CartComponent } from './pages/cart/cart.component';
import { TestComponent } from './pages/test/test.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StoresComponent } from './pages/admin/stores/stores.component';
import { AdminsComponent } from './pages/admin/admins/admins.component';
import { AccountComponent } from './pages/account/account.component';
import { MyStoresComponent } from './pages/my-stores/my-stores.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { DepartmentsComponent } from './pages/admin/departments/departments.component';
import { Routes, RouterModule } from '@angular/router';
import { MyStoresProductsComponent } from './pages/my-stores-products/my-stores-products.component';

const routes: Routes = [{
    'path':      'cart',
    'component': CartComponent
},{
    'path':      'test',
    'component': TestComponent
},{
    'path':      'home',
    'component': HomeComponent
},{
    'path':      'login',
    'component': LoginComponent
},{
    'path':      'admin',
    'component': AdminComponent
},{
    'path':      'admin/admins',
    'component': AdminsComponent
},{
    'path':      'admin/stores',
    'component': StoresComponent
},{
    'path':      'admin/departments',
    'component': DepartmentsComponent
},{
    'path':      'mystores',
    'component': MyStoresComponent
},{
    'path':      'mystores/:storeId/products',
    'component': MyStoresProductsComponent
},{
    'path':      'wishlist',
    'component': WishlistComponent
},{
    'path':      'register',
    'component': RegisterComponent
},{
    'path':      'account',
    'component': AccountComponent
},{
    'path':      '**',
    'component': NotFoundComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}