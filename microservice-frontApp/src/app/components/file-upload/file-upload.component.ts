import {Component} from '@angular/core';
import {FileDataService} from "./FileDataService ";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  userId: number | null = null;
  filePreviewUrl: string | null = null;
  constructor(private fileDataService: FileDataService) {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      this.userId = parseInt(userIdString, 10);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      if (this.selectedFile.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePreviewUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      } else if (this.selectedFile.type === 'application/pdf') {
        this.filePreviewUrl = 'assets/pdf-icon.png';
      } else {
        this.filePreviewUrl = null;
      }
    }
  }

  onUpload(): void {
    if (this.selectedFile && this.userId) {
      this.fileDataService.uploadFile(this.userId, 'IMAGE', this.selectedFile).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          console.error('Failed to upload file:', error);
        }
      );
    } else {
      console.error('Selected file or userId is missing.');
    }
  }
}
