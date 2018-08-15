import { Md5 } from 'ts-md5/dist/md5';
import { ApiService } from '../../services/api/api.service';
import { FormerrorService }  from '../../services/formerror/formerror.service';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

    constructor(private api: ApiService, public formerror: FormerrorService) {}

    public cart:        any   = {};
    public products:    any[] = [];
    public paymentData: any   = {
        "return_url":           "https://bitid.co.za",
        "cancel_url":           "http://google.co.za",
        "notify_url":           "http://643705dd83d0.sn.mynetname.net/billing/billing/payfast",
        "custom_int1":          "0",
        "merchant_id":          "10009371",
        "merchant_key":         "v1ejzs5b7qdoq",
        "payment_method":       "cc",
        "email_confirmation":   "1",
        "confirmation_address": "shane@macrocomm.co.za"
    };
    public payFastForm: FormGroup;
    public formErrors = {
        "amount":           "",
        "item_name":        "",
        "name_last":        "",
        "name_first":       "",
        "cell_number":      "",
        "custom_str1":      "",
        "m_payment_id":     "",
        "email_address":    "",
        "item_description": ""
    };

    public updateCart() {
        this.paymentData.amount = "0";
        let total = 0;
        let cart = {
            "items": []
        };
        this.products.map(product => {
            if (parseInt(product.quantity) > 0) {
                cart.items.push(product);
            };
            if (parseInt(product.quantity) > 0 && parseInt(product.quantity) < 100) {
                total += parseInt(product.quantity) * parseInt(product.price1);
            };
            if (parseInt(product.quantity) >= 100 && parseInt(product.quantity) < 1000) {
                total += parseInt(product.quantity) * parseInt(product.price2);
            };
            if (parseInt(product.quantity) >= 1000 && parseInt(product.quantity) < 10000) {
                total += parseInt(product.quantity) * parseInt(product.price3);
            };
            if (parseInt(product.quantity) >= 10000) {
                total += parseInt(product.quantity) * parseInt(product.price4);
            };
        });
        this.paymentData.amount       = total;
        this.paymentData.m_payment_id = new Date().valueOf();
        this.paymentData.custom_str1  = JSON.stringify(cart);
    };

    public submit() {
        this.paymentData.amount           = this.payFastForm.value.amount; 
        this.paymentData.item_name        = this.payFastForm.value.item_name; 
        this.paymentData.name_last        = this.payFastForm.value.name_last; 
        this.paymentData.name_first       = this.payFastForm.value.name_first; 
        this.paymentData.cell_number      = this.payFastForm.value.cell_number; 
        this.paymentData.custom_str1      = this.payFastForm.value.custom_str1; 
        this.paymentData.m_payment_id     = this.payFastForm.value.m_payment_id; 
        this.paymentData.email_address    = this.payFastForm.value.email_address; 
        this.paymentData.item_description = this.payFastForm.value.item_description; 
        this.api.test("https://sandbox.payfast.co.za/eng/process", this.paymentData, res => {

        }, err => {

        });
    };

    public signature() {
        let strData = "";
        for (let key in this.paymentData) {
            if (key != 'signature') {
                let myVal = encodeURIComponent(this.paymentData[key]);
                myVal = myVal.replace(/\%20/g, '+');
                strData = strData + key + '=' + myVal + '&';
            };
        };
        strData = strData.substring(0,strData.length-1);
        this.paymentData.signature = Md5.hashStr(strData);
    };

    public createForm() {
        this.payFastForm = new FormGroup({
            'amount':           new FormControl('10'),
            'item_name':        new FormControl('Online Store Purchase'),
            'name_last':        new FormControl('bowyer'),
            'name_first':       new FormControl('shane'),
            'cell_number':      new FormControl('0828863782'),
            'custom_str1':      new FormControl('Extra info here'),
            'm_payment_id':     new FormControl('1'),
            'email_address':    new FormControl('shane@macrocomm.co.za'),
            'item_description': new FormControl('A test product')
        });

        this.payFastForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formerror.validateForm(this.payFastForm, this.formErrors, true);
        });
    };

    ngOnInit() {
        this.products.push({
            "itemName": "ICEMETER-WAT-DET",
            "quantity": 0,
            "price1": 500,
            "price2": 375, 
            "price3": 350,
            "price4": 330 
        });

        this.products.push({
            "itemName": "ICEMETER-PULSE",
            "quantity": 0,
            "price1": 580,
            "price2": 455, 
            "price3": 425,
            "price4": 390 
        });

        setInterval(() => this.signature(), 1000);

        this.createForm();
    };
}