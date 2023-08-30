/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
export const lightTheme = 
{'white':'#ffffff',
"toast-background":'#ffffff',
"toast-text":"#333333",
"detail-text":"#ffffff",
"heder-background":"aliceblue",
"product-listbg":"#7474e3",
"skubg":"#f5d1a1",
"addNewPskuBtn":"#008000",
"link-color":"#e18f2a",
"opbg":"#4caeeb",
"Oitemdetail":"#87cefa",

}

export const darkTheme=
{ "black":"#000000",
"toast-background":'#333333',
"toast-text":"#ffffff",
"detail-text":"#ffffff",
"pdark-background":'#333333',
"pdark-text":"rgba(0,0,0,0.87)",
"dark-text":"color:#b0bec5",
"heder-background":"#333333",
"link-color":"#333333",
"skubg":"#333333",
"addNewPskuBtn":"#333333",
"product-listbg":"#333333",
 "opbg":"#333333",
 "Oitemdetail":"#333333",
}

@Injectable({
  providedIn: 'root'
})




export class ThemeService {
  public isDark=false;
  constructor() { }


  toggleLight(){
    this.isDark=false;
    this.setTheme(lightTheme);
  }

toggleDark(){
  this.isDark=true;
  this.setTheme(darkTheme);
}


private setTheme(theme:any){
  Object.keys(theme).forEach(k=>document.documentElement.style.setProperty(`--${k}`,theme[k]));
}
}