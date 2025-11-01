import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { ApiHelperService } from '../../shared/api-helper.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MediaService } from '../../services/media.service';
// import { merge } from 'lodash';

@Component({
  selector: 'apnst-formly-field-file',
  templateUrl: './formly-field-file.component.html',
  styleUrls: ['./formly-field-file.component.scss'],
  imports: [CommonModule, FormsModule, FormlyModule]
})
export class FormlyFieldFileComponent extends FieldType implements OnInit {
  mimeTypes: any = {
    image: { type: ['.jpg', '.png', '.gif'], mime: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'] },
    video: { type: ['.mp4', '.webm'], mime: ['video/mp4', 'video/webm'] },
    file: { type: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.mp4', '.webm', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.csv', '.zip'], mime: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4', 'video/webm', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'text/csv', 'application/zip', 'application/x-zip-compressed'] }
  };
  progress: number = 0;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private cd: ChangeDetectorRef,
    private apiHelperService: ApiHelperService
    // private mediaService: MediaService
  ) {
    super();
  }

  ngOnInit(): void {
    // Optionally merge fileUploadOptions from this.to.fileUploadOptions
  }

  get type() {
    return this.field.type;
  }

  uploadMedia(fileList: FileList, urlType?: string) {
    const files = Array.from(fileList);
    if (!files.length) return;
    // TODO: Validate and upload files using MediaService or ApiHelperService
    // For now, just mark as touched
    this.formControl.markAsTouched();
    this.cd.detectChanges();
  }

  removeImage() {
    this.formControl.setValue(null);
  }

  isImage(url: string) {
    const imageExtensions = this.mimeTypes['image'].type.map((ext: any) => ext.replace('.', ''));
    const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    return imageExtensions.includes(ext);
  }

  isVideo(url: string) {
    const videoExtensions = this.mimeTypes['video'].type.map((ext: any) => ext.replace('.', ''));
    const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    return videoExtensions.includes(ext);
  }
}
