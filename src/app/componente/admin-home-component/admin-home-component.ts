import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin-service';
import { PanelAdministrador } from '../../model/panel-administrador';

@Component({
  selector: 'app-admin-home-component',
  standalone: true,
  imports: [],
  templateUrl: './admin-home-component.html',
  styleUrl: './admin-home-component.css',
})
export class AdminHomeComponent {

  panel: PanelAdministrador = new PanelAdministrador();

  adminService = inject(AdminService);

  router = inject(Router);

  ngOnInit(): void {

    this.cargarPanel();

  }

  cargarPanel(): void {

    this.adminService.obtenerPanel().subscribe({

      next: (data) => {

        console.log("===== PANEL ADMIN =====");
        console.log(data);

        this.panel = data;

      },

      error: (err) => {

        console.error("===== ERROR PANEL =====");
        console.error(err);

        alert("No se pudo cargar el panel del administrador.");

      }

    });

  }

  irTickets(): void {

    this.router.navigate(['/admin/tickets']);

  }

}
