/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/theme.service';
interface themes {
  code:any;
  name:any;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  themes:themes[]=[
    {
    code:'wm',
    name:'white mode'
  },
    {
    code:'dm',
    name:'dark mode'},
  ]
  themeControl: any;
  selectedTheme: any;
  darkModeFlag: any=false;
  storedTheme:any;
  constructor(private auth: AuthService,private  themeService:ThemeService) { }
 

  ngOnInit(): void {
    

    // const storedTheme=localStorage.getItem('theme');
    // if(storedTheme&&this.darkModeFlag)
    // {
    //   this.selectedTheme=storedTheme;
    //   this.setThemeControlss(this.selectedTheme)
    // }
    // this.themeControl=new FormControl();
    // this.themeControl.valueChanges.subscribe((data:any)=>{
    //   if(data){
    //     this.themeService.toggleDark()
    //   }
    //   // else{
    //   //   this.themeService.toggleLight();
    //   // }
    // })
       this.themeService.toggleLight();
     

  }

  Logout(){
    if(confirm("Are you sure you want to LogOut?")){
      this.auth.logout();
    }
  }


  setThemeControlss(theme:any){
 
    // this.darkModeFlag =theme.value;
    // console.log("new theme",theme);
    // console.log('this.darkModeFlag',this.darkModeFlag);
    if(this.darkModeFlag===true){
      this.themeService.toggleLight();
      this.darkModeFlag=!this.darkModeFlag
    }
    else
    if(this.darkModeFlag===false){
      this.themeService.toggleDark();
      this.darkModeFlag=!this.darkModeFlag
    }
     localStorage.setItem('darkModeFlag',this.darkModeFlag);
    console.log("setItem",localStorage.getItem(this.darkModeFlag))
  }
 
  



}
