import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calculator',
        // Cargar directamente el componente mediante lazyload
        // loadComponent: () => import('./calculator/views/calculator-view/calculator-view.component').then( c => c.CalculatorViewComponent )
        // para ahorrar el then hay que hacer un  export default del componente
        loadComponent: () => import('./calculator/views/calculator-view/calculator-view.component')
    },
    {
        path: 'dummy',
        loadComponent: () => import('./dummy/dummy.component')
    },
    {
        path: '**', // ruta no existente, redirigira a calculator
        redirectTo: 'calculator'
    }
];
