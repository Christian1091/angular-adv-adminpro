import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  /**Aqui inyectamos el servicio creado anteriomente
   * ng g s services/settings --skipTests
   */
  constructor( private SettingsService: SettingsService) { }

  ngOnInit(): void {

    customInitFunctions();
  }

}
