import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as fromComponents from './components';
import { LoaderComponent } from './components/loader/loader.component';
import { HomeButtonComponent } from './components/buttons/home-button/home-button.component';
import { CollapseButtonComponent } from './components/buttons/collapse-button/collapse-button.component';
import { ExitButtonComponent } from './components/buttons/exit-button/exit-button.component';
import { AuthDirective } from './directives/auth.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [...fromComponents.components, LoaderComponent, HomeButtonComponent, CollapseButtonComponent, ExitButtonComponent, AuthDirective, CapitalizePipe, SafePipe ],
  imports: [ CommonModule, FormsModule ],
  exports: [ FormsModule, ...fromComponents.components ]
})
export class SharedModule { }
