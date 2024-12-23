/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private refreshSubheaderSubject = new BehaviorSubject<boolean>(false);
  refreshSubheader$ = this.refreshSubheaderSubject.asObservable();

  triggerSubheaderRefresh() {
    this.refreshSubheaderSubject.next(true);
  }
  constructor() { }
}
