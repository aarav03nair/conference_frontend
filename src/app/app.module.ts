import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlotSelectionComponent,
    AdminComponent,
    LoadingComponent
  ],
  imports: [
    BrowserAnimationsModule, // Required animations module
    ToastrModule.forRoot({
      timeOut: 3000,  // Toasts will disappear after 3 seconds
      positionClass: 'toast-top-right', // Toast position (you can change it)
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }