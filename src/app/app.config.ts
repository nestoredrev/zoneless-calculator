import { 
          ApplicationConfig, 
          provideExperimentalZonelessChangeDetection, 
         // provideZoneChangeDetection 
       } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }), 
    provideExperimentalZonelessChangeDetection(), // Habilitar Zoneless mas info sobre la configuracion: https://angular.dev/guide/experimental/zoneless
    provideRouter(routes)
  ]
};
