
import { Component, OnInit, ViewChild, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { EditorModule } from "@tinymce/tinymce-angular";
// import { FilemanagerComponent } from '../../components/filemanager/filemanager.component';
// import { ContentEditorService } from '../../services/content-editor.service';

@Component({
    selector: 'apnst-formly-field-tiny-mce',
    templateUrl: './formly-field-tiny-mce.component.html',
    styleUrls: ['./formly-field-tiny-mce.component.scss'],
    imports: [EditorModule, FormsModule]
})
export class FormlyFieldTinyMceComponent extends FieldType implements OnInit {
    // @ViewChild(FilemanagerComponent) fileManager: FilemanagerComponent;
    public filemanagerFile: string | undefined;
    public config: any = {};

    constructor(
        /* @Optional() private editorService: ContentEditorService */
    ) {
        super();
        // If ContentEditorService is available, use its config, else fallback
        // let config = this.editorService ? Object.assign({}, this.editorService._fullEditorConfig) : {};
        let config: any = {};
        config.file_picker_types = 'image';
        config.file_picker_callback = (cb: any, value: any, meta: any) => {
            // if (this.fileManager) {
            //   this.fileManager.openDialog();
            //   this.fileManager.fileSelectedChange.subscribe((fileInput: string) => {
            //     let src = location ? `${location?.protocol?.replace(/\:/g, '')}://${location?.hostname}${fileInput}` : fileInput;
            //     cb(src);
            //   });
            // } else {
            cb(''); // fallback: no file manager
            // }
        };
        this.config = config;
    }

    get value() {
        return this.formControl.value;
    }
    set value(val: any) {
        this.formControl.setValue(val);
    }

    ngOnInit(): void {
        if (this.to && this.to['tinyMceOptions']) {
            this.config = Object.assign(this.config, this.to['tinyMceOptions']);
        }
    }
}
