import { NgModule } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart/cart.service';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { StoresService } from './services/stores/stores.service';
import { TestComponent } from './pages/test/test.component';
import { AdminsService } from './services/admins/admins.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './pages/login/login.component';
import { ShareComponent } from './components/share/share.component';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './pages/admin/admin.component';
import { ControlService } from './services/control/control.service';
import { ProductsService } from './services/products/products.service';
import { RemoveComponent } from './components/remove/remove.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StoresComponent } from './pages/admin/stores/stores.component';
import { AdminsComponent } from './pages/admin/admins/admins.component';
import { AccountComponent } from './pages/account/account.component';
import { FormerrorService } from './services/formerror/formerror.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { MyStoresComponent } from './pages/my-stores/my-stores.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DepartmentsService } from './services/departments/departments.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreItemComponent } from './components/store-item/store-item.component';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { StoreEditorComponent } from './pages/admin/stores/store-editor/store-editor.component';
import { StoreViewerComponent } from './pages/admin/stores/store-viewer/store-viewer.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { DepartmentsComponent } from './pages/admin/departments/departments.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminsEditorComponent } from './pages/admin/admins/admins-editor/admins-editor.component';
import { AdminsViewerComponent } from './pages/admin/admins/admins-viewer/admins-viewer.component';
import { AccountButtonComponent } from './components/account-button/account-button.component';
import { ProductEditorComponent } from './pages/my-stores-products/product-editor/product-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MyStoresProductsComponent } from './pages/my-stores-products/my-stores-products.component';
import { DepartmentEditorComponent } from './pages/admin/departments/department-editor/department-editor.component';
import { DepartmentViewerComponent } from './pages/admin/departments/department-viewer/department-viewer.component';
import { ImageUploadMultipleComponent } from './components/image-upload-multiple/image-upload-multiple.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        CartComponent,
        TestComponent,
        HomeComponent,
        LoginComponent,
        ShareComponent,
        AdminComponent,
        RemoveComponent,
        StoresComponent,
        AdminsComponent,
        SpinnerComponent,
        ReviewsComponent,
        AccountComponent,
        NotFoundComponent,
        RegisterComponent,
        WishlistComponent,
        CheckoutComponent,
        MyStoresComponent,
        StoreItemComponent,
        UnsubscribeComponent,
        StoreEditorComponent,
        StoreViewerComponent,
        ImageUploadComponent,
        DepartmentsComponent,
        AdminsEditorComponent,
        AdminsViewerComponent,
        AccountButtonComponent,
        ProductEditorComponent,
        ForgotPasswordComponent,
        MyStoresProductsComponent,
        DepartmentEditorComponent,
        DepartmentViewerComponent,
        ImageUploadMultipleComponent,
    ],
    imports: [
        HttpModule,
        FormsModule,
        OrderModule,
        MatListModule,
        BrowserModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatSortModule,
        MatInputModule,
        MatTableModule,
        MatChipsModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatToolbarModule,
        MatDividerModule,
        MatStepperModule,
        AppRoutingModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
    ],
    providers: [
        ApiService,
        AuthService,
        CartService,
        StoresService,
        AdminsService,
        ControlService,
        ProductsService,
        FormerrorService,
        DepartmentsService,
        LocalstorageService,
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ShareComponent,
        RemoveComponent,
        StoreItemComponent,
        StoreEditorComponent,
        StoreViewerComponent,
        UnsubscribeComponent,
        ImageUploadComponent,
        AdminsEditorComponent,
        AdminsViewerComponent,
        ProductEditorComponent,
        AccountButtonComponent,
        ForgotPasswordComponent,
        DepartmentEditorComponent,
        DepartmentViewerComponent,
    ]
})

export class AppModule {}