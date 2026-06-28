import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatCell,
  MatCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
} from '@angular/material/table';

import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';

import { TicketService } from '../../services/ticket-service';
import { Ticket } from '../../model/ticket';

@Component({
  selector: 'app-ticket-component',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,

    MatTable,

    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,

    MatCell,
    MatCellDef,

    MatHeaderRow,
    MatHeaderRowDef,

    MatRow,
    MatRowDef,

    MatPaginator,

    MatSort,
    MatSortHeader,

    MatButton,
  ],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent implements AfterViewInit {
  displayedColumns: string[] = ['asunto', 'estado', 'creadoEn', 'mensajeRespuesta'];

  dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ticketService = inject(TicketService);

  router = inject(Router);

  ngOnInit() {
    console.log('ENTRÓ AL TICKET COMPONENT');

    this.listar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listar() {
    this.ticketService.list().subscribe({
      next: (data) => {
        console.log(data); // <-- Agrega esto

        this.dataSource.data = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  irCrear() {
    this.router.navigate(['/ticket-nuevo']);
  }
}
