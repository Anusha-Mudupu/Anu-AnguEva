/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';

export const lightTheme = {
  'white': '#ffffff',
  "toast-background": '#ffffff',
  "toast-text": "#333333",
  "detail-text": "#ffffff",
  "heder-background": "aliceblue",
   "cardheaderbg":"#C0C0C0",
   "subheaderbg":"#2F4F4F",
   "navbarbg":"	#000000",
   "navbartxt":"#333333",
   "themebg":'#ffffff',
   "register-text":'#2F4F4F',
   "toast-track":'black'
}
export const darkTheme = {
  "black": "#000000",
  "toast-background": '#333333',
  "toast-text": "#ffffff",
  "detail-text": "#ffffff",
  "pdark-background": '#333333',
  "pdark-text": "rgba(0,0,0,0.87)",
  "dark-text": "color: #b0bec5",
  "heder-background": "#333333",
  "cardheaderbg":"#C0C0C0",
  // "subheaderbg":"#2F4F4F",
  "subheaderbg":"#000000",
  "navbarbg":"#778899",
  "navbartxt":"#333333",
  "themebg":'#ffffff',
  "register-text":'#DAA520',
  "toast-track":'white'
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 public th:any;
  public isDark = false;
  
  constructor() { 
    const theme = localStorage.getItem('theme') || 'wm';
    this.isDark = theme === 'dm';
    this.setTheme(this.isDark ? darkTheme : lightTheme);
  }


  // toggleLight() {
  //   this.isDark = false;
  //   this.setTheme(lightTheme);
   
  // }
  
  toggleLight() {
    this.isDark = false;
    this.setTheme(lightTheme);
    localStorage.setItem('theme', 'wm');
  }
  // toggleDark() {
  //   this.isDark = true;
  //   this.setTheme(darkTheme);
  // }
  toggleDark() {
    this.isDark = true;
    this.setTheme(darkTheme);
    localStorage.setItem('theme', 'dm');
  }
  // private setTheme(theme: {}) {

  //   Object.keys(theme).forEach(k =>
  //     document.documentElement.style.setProperty(`--${k}`, theme[k])

  //   );

  // }
  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

}
