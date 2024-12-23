import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  values = '';
  value1;
  constructor() { }
  onKey(event: any) {
    this.values = event.target.value + '|';
  }
  onkey2(value: String) {
    this.value1 = value;

  }
  mouseEnter(div: string) {
    console.log("mouse enter : " + div);
  }

  mouseLeave(div: string) {
    console.log('mouse leave :' + div);
  }
  ngOnInit() {
  }

}
