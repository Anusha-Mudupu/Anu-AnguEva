import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShipOptionSelectComponent } from '../subheader/ship-option-select/ship-option-select.component';

@Injectable({
  providedIn: 'root'
})
export class CartShipOptionSelectService {
  shipOptionSelectRef: ShipOptionSelectComponent;
  shipOptionSelect: BehaviorSubject<ShipOptionSelectComponent>;
  constructor() { }

  shipOptionSelectComponentRef(ref) {
    console.log("entered in to shipOptionSelectComponentRef(.) of CartShipOptionSelectService ");
    this.shipOptionSelect = new BehaviorSubject(ref);
    this.shipOptionSelect.next(ref);
  }

}
