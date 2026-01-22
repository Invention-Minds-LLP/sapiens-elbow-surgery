import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear()

  goToDoctor() {
    window.open('https://www.sapiensclinic.com/dr-darshan-kumar-a-jain', '_blank');


  }
  scrollToContact() {
    const element = document.getElementById('contact');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
