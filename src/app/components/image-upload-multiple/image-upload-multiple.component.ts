import { Component } from '@angular/core';

@Component({
    selector: 'image-upload-multiple',
    templateUrl: './image-upload-multiple.component.html',
    styleUrls: ['./image-upload-multiple.component.scss']
})

export class ImageUploadMultipleComponent {

    constructor() {};

    public images: any[] = [];
}