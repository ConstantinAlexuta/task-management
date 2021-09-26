import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from 'src/store/reducers';

import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TaskModule } from './components/task/task.module';
import { TaskResolver } from './components/task/resolver/task.resolver';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    TaskModule,

    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    HttpClientModule,
    BrowserModule,

    AppRoutingModule,

    EffectsModule.forRoot([]),

    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    BrowserAnimationsModule,
  ],
  providers: [TaskResolver],
  bootstrap: [AppComponent],
})
export class AppModule { }
