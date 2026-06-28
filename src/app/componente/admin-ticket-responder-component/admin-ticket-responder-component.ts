import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AdminService } from '../../services/admin-service';
import { Ticket } from '../../model/ticket';
import { RespuestaTicket } from '../../model/respuesta-ticket';

@Component({
  selector: 'app-admin-responder-ticket-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './admin-ticket-responder-component.html',
  styleUrl: './admin-ticket-responder-component.css'
})
export class AdminResponderTicketComponent {

  ticket: Ticket = new Ticket();

  respuestaForm: FormGroup;

  adminService = inject(AdminService);

  router = inject(Router);

  route = inject(ActivatedRoute);

  fb = inject(FormBuilder);

  constructor(){

    this.respuestaForm = this.fb.group({

      mensajeRespuesta:['',Validators.required]

    });

  }

  ngOnInit(){

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.adminService.obtenerTicket(id).subscribe({

      next:(data)=>{

        this.ticket = data;

      }

    });

  }

  responder(){

    if(this.respuestaForm.invalid){

      alert("Ingrese una respuesta.");

      return;

    }

    const respuesta = new RespuestaTicket();

    respuesta.mensajeRespuesta =
      this.respuestaForm.value.mensajeRespuesta;

    this.adminService
      .responderTicket(this.ticket.id,respuesta)
      .subscribe({

        next:()=>{

          alert("Ticket respondido correctamente.");

          this.router.navigate(['/admin/tickets']);

        },

        error:(err)=>{

          console.error(err);

          alert("Ocurrió un error.");

        }

      });

  }

}
