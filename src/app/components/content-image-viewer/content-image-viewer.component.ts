import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-content-image-viewer',
    templateUrl: './content-image-viewer.component.html',
    styleUrls: ['./content-image-viewer.component.sass']
})
export class ContentImageViewerComponent implements OnInit {
    src: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        this.src = this.data.src;
    }

    ngOnInit() {
    }

}
