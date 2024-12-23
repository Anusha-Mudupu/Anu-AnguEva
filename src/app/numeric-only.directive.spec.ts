/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {
  private regex:RegExp = new RegExp('[^0-9]*$');
  private specialKeys:Array<string>=['Backspace','ArrowLeft','ArrowRight']
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) ! == -1) {
     return;
    }
    const inputValue:string = this.el.nativeElement.value.concat(event.key);
    console.log(event.key)
    if(inputValue && !String(inputValue).match(this.regex)){
      event.preventDefault();
    }
    return;
  }
}
