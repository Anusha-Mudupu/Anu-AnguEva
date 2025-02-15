import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  @Input() errorMessage: string;
  constructor() { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.errorMessage;
  }
}
