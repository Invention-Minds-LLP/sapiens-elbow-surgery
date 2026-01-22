import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { HomePage } from "./home-page/home-page";
import { Footer } from "./footer/footer";
import { ContactForm } from "./contact-form/contact-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, HomePage, Footer, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sapiens-website');
}
