import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { ContactForm } from "../contact-form/contact-form";
import { Route, Router } from '@angular/router';
import { CallBackForm } from "../call-back-form/call-back-form";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  imports: [NavBar, CommonModule, FormsModule, Footer, ContactForm, ReactiveFormsModule, CallBackForm],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  @ViewChild('subNavScroll') subNavScroll!: ElementRef;

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  @Input() menuOpen = false;


  isStuck = false;
  isAtStart = true;
  isAtEnd = false;

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);

    if (el) {
      const yOffset = -100; // adjust if you have sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  ngOnInit(): void {
    this.observeSubNav();

    this.titleService.setTitle(
      'Elbow Surgery in Malleshwaram Bangalore | Sapiens Clinic'
    );

    this.metaService.updateTag({
      name: 'description',
      content: 'Expert elbow surgery in Malleshwaram, Bangalore by Dr. Darshan Kumar A. Jain. Advanced treatment for elbow pain, stiffness, injuries at Sapiens Clinic.'
    });
  }


  ngAfterViewInit(): void {
    // Check initial scroll position
    this.checkScrollPosition();

    // Add scroll event listener to the sub-nav scroll container
    if (this.subNavScroll) {
      this.subNavScroll.nativeElement.addEventListener('scroll', () => {
        this.checkScrollPosition();
      });
    }
  }

  centerTab(event: Event) {
    if (!this.subNavScroll) return;

    const container = this.subNavScroll.nativeElement as HTMLElement;
    const target = event.target as HTMLElement;

    container.scrollTo({
      left: target.offsetLeft - container.clientWidth / 2 + target.offsetWidth / 2,
      behavior: 'smooth'
    });
  }


  ngOnDestroy(): void {
    // Clean up event listeners if needed
  }

  // Method to observe when sub-nav becomes sticky
  observeSubNav(): void {
    const subNav = document.querySelector('.sub-nav');
    const banner = document.querySelector('.banner-part');

    if (subNav && banner) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.isStuck = !entry.isIntersecting;
        },
        {
          threshold: 0,
          rootMargin: '-80px 0px 0px 0px' // Account for fixed navbar height
        }
      );

      observer.observe(banner);
    }
  }
  scrollRight(): void {
    if (!this.subNavScroll) return;

    const container = this.subNavScroll.nativeElement as HTMLElement;
    const items = container.querySelectorAll('li');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;

      if (itemCenter > containerCenter + 10) {
        container.scrollTo({
          left: item.offsetLeft - container.clientWidth / 2 + item.offsetWidth / 2,
          behavior: 'smooth'
        });
        return;
      }
    }
  }

  scrollLeft(): void {
    if (!this.subNavScroll) return;

    const container = this.subNavScroll.nativeElement as HTMLElement;
    const items = container.querySelectorAll('li');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i] as HTMLElement;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;

      if (itemCenter < containerCenter - 10) {
        container.scrollTo({
          left: item.offsetLeft - container.clientWidth / 2 + item.offsetWidth / 2,
          behavior: 'smooth'
        });
        return;
      }
    }
  }


  // Check scroll position to enable/disable arrows
  checkScrollPosition(): void {
    if (this.subNavScroll) {
      const scrollContainer = this.subNavScroll.nativeElement;
      const scrollLeft = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;

      // Check if at start
      this.isAtStart = scrollLeft <= 0;

      // Check if at end (with small tolerance)
      this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
    }
  }

  // Alternative method using scroll listener for stuck effect
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const subNav = document.querySelector('.sub-nav');
    const banner = document.querySelector('.banner-part');

    if (subNav && banner) {
      const bannerBottom = banner.getBoundingClientRect().bottom;
      const navbarHeight = 80; // Height of fixed main navbar

      if (bannerBottom <= navbarHeight + 73) { // 73 is sub-nav height
        this.isStuck = true;
      } else {
        this.isStuck = false;
      }
    }
  }

  // Handle window resize to check scroll position
  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScrollPosition();
  }

  // Smooth scroll to sections (optional)
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 160; // 80 (main nav) + 73 (sub nav)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  isExpanded = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  performCard = [
    {
      img: '/imgs/Elbow-replacement.jpeg',
      heading: 'Elbow Replacement / Elbow Arthroplasty',
      para: 'Surgical replacement of damaged elbow joint components to reduce pain and improve movement'
    },
    {
      img: '/imgs/Elbow-arthroscopy.jpg',
      heading: 'Elbow Arthroscopy',
      para: 'Minimally invasive elbow surgery used to diagnose and treat elbow joint problems accurately.'
    },
    {
      img: '/imgs/Synovitis-of-elbow.jpeg',
      heading: 'Synovitis of Elbow',
      para: 'Surgical management of inflamed elbow joint lining causing pain and stiffness.'
    },
    {
      img: '/imgs/Ligament-repair.jpeg',
      heading: 'Ligament Repair or Reconstruction of Elbow',
      para: 'Repair or reconstruction of injured elbow ligaments to restore joint stability and function.'
    },
  ]

  faqs = [
    {
      question: 'Is elbow surgery safe?',
      answer: ' Elbow surgery is generally safe when performed after proper evaluation. Risks and benefits are discussed during consultation.'
    },
    {
      question: 'Will elbow surgery be painful?',
      answer: 'Pain is usually well managed with medications and post-operative care.'
    },
    {
      question: 'How long does recovery take after elbow surgery?',
      answer: 'Recovery varies. Some patients resume light activities within weeks, while full recovery may take longer.'
    },
    {
      question: 'Is physiotherapy required after elbow surgery?',
      answer: 'Yes. Physiotherapy helps restore elbow movement and strength safely.'
    },
    {
      question: 'When can I return to work?',
      answer: 'Return to work depends on your job role and recovery progress.'
    },
    {
      question: 'Is surgery always necessary for elbow pain?',
      answer: 'No. Many elbow conditions improve with non-surgical treatment. Elbow surgery is advised only when other options are ineffective.'
    },
  ];

  activeIndex: number | null = null;

  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  goToDoctor() {
    window.open('https://www.sapiensclinic.com/dr-darshan-kumar-a-jain', '_blank');
  }





}