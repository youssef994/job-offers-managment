import { Component } from '@angular/core';
import {FileDataService} from "../../file-upload/FileDataService ";

@Component({
  selector: 'app-image-download',
  templateUrl: './image-download.component.html',
  styleUrls: ['./image-download.component.css']
})
export class ImageDownloadComponent {
  userId: number = 0;
  imageBlob: Blob | null = null;
  imageSrc: string | null = null;

  constructor(private fileDataService: FileDataService) {}

  ngOnInit(): void {
    const userIdFromLocalStorage = localStorage.getItem('userId');
    if (userIdFromLocalStorage) {
      this.userId = parseInt(userIdFromLocalStorage, 10);
    }

    this.downloadImage();
  }

  downloadImage(): void {
    this.fileDataService.downloadImage(this.userId).subscribe((data) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(data);
    });
  }
}
