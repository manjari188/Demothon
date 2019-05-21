import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NvdiComponent } from './nvdi/nvdi.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demothon';
  show= true;

  constructor(private router: Router){}

  handleClick() {
    this.show=false;
    this.router.navigate(['/ndvi']);
  }
}
  