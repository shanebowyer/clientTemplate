import { CartService } from './../../services/cart/cart.service';
import { Input, Component } from '@angular/core';


@Component({
    selector: 'store-item',
    templateUrl: './store-item.component.html',
    styleUrls: ['./store-item.component.scss']
})

export class StoreItemComponent {

    @Input() public item: any = {};

    constructor(public cart: CartService) {};
}