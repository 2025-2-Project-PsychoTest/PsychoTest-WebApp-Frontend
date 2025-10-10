import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageSwitcher} from "../language-switcher/language-switcher";
import { BellIndicatorComponent } from '../../../../modules/som/presentation/components/bell-indicator/bell-indicator';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLinkActive, RouterLink, Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-header-content',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcher, RouterLinkActive, RouterLink, BellIndicatorComponent
    ],
  templateUrl: './header-content.html',
  styleUrl: './header-content.css'

})
export class HeaderContent {

}
