import { Component } from '@angular/core';
import {FileDataService} from "../../file-upload/FileDataService ";

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})
export class PdfDownloadComponent {
  userId: number = 0; // Initialize with a default value or get it from local storage
  pdfBlob: Blob | null = null;

  constructor(private fileDataService: FileDataService) {}

  ngOnInit(): void {
    const userIdFromLocalStorage = localStorage.getItem('userId');
    if (userIdFromLocalStorage) {
      this.userId = parseInt(userIdFromLocalStorage, 10);
    }

    this.downloadPDF();
  }

  downloadPDF(): void {
    this.fileDataService.downloadPDF(this.userId).subscribe((data) => {
      // Handle the downloaded PDF data here
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      this.pdfBlob = blob;
    });
  }
}
