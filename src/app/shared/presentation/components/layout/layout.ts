import {Component, ViewChild} from '@angular/core';

import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatSidenav} from '@angular/material/sidenav';

import { BreakpointObserver } from "@angular/cdk/layout";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {HeaderContent} from '../header-content/header-content';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, MatToolbarRow, MatToolbar, MatButton, RouterLinkActive,
    TranslatePipe, LanguageSwitcher, FooterContent, MatIcon, MatIconButton, MatNavList, MatListItemIcon, MatListItem, HeaderContent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  isSidenavOpen = true;
  isStudent = true; // Toggle between student and psychologist
  sidenavMode: 'side' | 'over' = 'side';
  options_toolbar = [
    {link: '/home', label: 'option.home'},
    {link: '/about', label: 'option.about'},
    {link: '/learning/categories', label: 'option.categories'},
    {link: '/learning/courses', label: 'option.courses'}
  ];

  options_student = [
    { label: 'SIDEBAR.HOME', link: 'student/home', icon: 'home' },
    { label: 'SIDEBAR.PROFILE', link: 'student/profile', icon: 'person' },
    { label: 'SIDEBAR.TESTS', link: 'student/tests', icon: 'quiz' },
    { label: 'SIDEBAR.SESSIONS', link: 'student/sessions', icon: 'calendar_month' },
    { label: 'SIDEBAR.DASHBOARD', link: 'student/dashboard', icon: 'dashboard' },
    { label: 'SIDEBAR.SETTINGS', link: 'student/settings', icon: 'settings' }
  ];

  options_psychologist = [
    { label: 'SIDEBAR.HOME', link: 'psychologist/home', icon: 'home' },
    { label: 'SIDEBAR.PROFILE', link: 'psychologist/profile', icon: 'person' },
    { label: 'SIDEBAR.SESSIONS', link: 'psychologist/sessions', icon: 'schedule' },
    { label: 'SIDEBAR.DASHBOARD', link: 'psychologist/dashboard', icon: 'dashboard' },
    { label: 'SIDEBAR.PATIENTS', link: 'psychologist/students', icon: 'group' },
    { label: 'SIDEBAR.SETTINGS', link: 'psychologist/settings', icon: 'settings'},
  ];
options = this.options_student;
  constructor(private translate: TranslateService, private observer: BreakpointObserver, private router: Router){}
  toggleOptions() {
    // Cambia el tipo de usuario y la lista de opciones
    this.isStudent = !this.isStudent;
    this.options = this.isStudent ? this.options_student : this.options_psychologist;

    // Obtiene la ruta actual
    const currentUrl = this.router.url;
    let newUrl = currentUrl;

    // Reemplaza la parte del tipo de usuario en la URL
    if (currentUrl.startsWith('/student/')) {
      newUrl = currentUrl.replace('/student/', '/psychologist/');
    } else if (currentUrl.startsWith('/psychologist/')) {
      newUrl = currentUrl.replace('/psychologist/', '/student/');
    }

    // Navega a la nueva ruta si cambió
    if (newUrl !== currentUrl) {
      this.router.navigateByUrl(newUrl);
    }
  }

}
