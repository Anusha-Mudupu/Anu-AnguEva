import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading1: boolean=true;
  loading = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading1=false
    },1000);
  }

}
