import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'select-slots', component: SlotSelectionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
