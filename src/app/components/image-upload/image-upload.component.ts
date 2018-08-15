import { Input, Output, Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent {

    constructor() {};

    @Input() image: any;
    @Output() imageChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    handleFileInput(files: FileList) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.image = reader.result;
            this.imageChange.emit(this.image);
        };
        reader.readAsDataURL(files.item(0));
    }
}