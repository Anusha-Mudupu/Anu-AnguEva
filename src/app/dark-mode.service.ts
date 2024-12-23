/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private renderer: Renderer2;
  private darkModeActive = false;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
   }
   enableDarkMode(): void {
    this.darkModeActive = true;
    this.renderer.addClass(document.body, 'dark-mode');
  }

  disableDarkMode(): void {
    this.darkModeActive = false;
    this.renderer.removeClass(document.body, 'dark-mode');
  }
  toggleDarkMode(): void {
    this.darkModeActive ? this.disableDarkMode() : this.enableDarkMode();
  }

  isDarkModeActive(): boolean {
    return this.darkModeActive;
  }
}
