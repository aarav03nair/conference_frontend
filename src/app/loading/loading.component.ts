import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="loading-overlay">
               <div class="spinner"><h1>Loading...</h1></div>
             </div>`,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {}
