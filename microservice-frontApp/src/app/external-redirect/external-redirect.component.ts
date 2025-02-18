import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-external-redirect',
  templateUrl: './external-redirect.component.html',
  styleUrls: ['./external-redirect.component.scss']
})
export class ExternalRedirectComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const externalUrl = this.route.snapshot.data['externalUrl'];
    window.location.href = (externalUrl);
  }
}
