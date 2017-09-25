import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
    {
        path: 'calculator',
        component: CalculatorComponent
    },
    {
        path: ':slug',
        component: PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule { }