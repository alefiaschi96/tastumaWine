import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent {
  public isMenuCollapsed = true;

  constructor() { }

}
