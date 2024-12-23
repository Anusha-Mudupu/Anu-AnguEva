/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { param } from 'jquery';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {
  // private regex: RegExp = new RegExp('[^0-9]*$');
  private regex: RegExp =  /^[6-9][0-9]{0,9}$/;;  //Decimal Number
  private specialKeys: Array<string> = ['Backspace','ArrowLeft','ArrowRight'];

  constructor(private elementRef: ElementRef) { }
   /**
   * Key board action
   * @param event 
   */ 

  @HostListener('keydown', ['$event'])onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    console.log(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault();
    }

    return;
  }

 /**
   * Copy Paste action 
   * @param event 
   */


  @HostListener('paste', ['$event']) onPaste(event) {
      const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
      if (clipboardData) {
          const regEx = new RegExp('^[6-9][0-9]*$');
          if(!regEx.test(clipboardData)) {
              event.preventDefault();
          }
      }
      return;
  }
}


