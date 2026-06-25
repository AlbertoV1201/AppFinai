import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {Navbar} from './componente/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AppFinia');
  router = inject(Router);

  verNavbar(): boolean{
    return this.router.url !== '/login'
      && this.router.url !== '/registro';
  }
}
