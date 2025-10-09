import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix: './assets/i18n/', suffix: '.json'}),
      defaultLanguage: 'en'
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const browserLang = translate.getBrowserLang();
      const langToUse = (browserLang === 'es' || browserLang === 'en') ? browserLang : 'en';
      translate.use(langToUse);
    })
  ]
};
