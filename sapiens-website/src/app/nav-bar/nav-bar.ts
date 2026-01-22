import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
   @Output() menuState = new EventEmitter<boolean>();

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuState.emit(this.menuOpen); // ✅ send state
  }



}
