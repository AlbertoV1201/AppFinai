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

import { AdminService } from '../../services/admin-service';
import { Ticket } from '../../model/ticket';

@Component({
  selector: 'app-admin-ticket-component',
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
  templateUrl: './admin-ticket-component.html',
  styleUrl: './admin-ticket-component.css',
})
export class AdminTicketComponent implements AfterViewInit {
  displayedColumns: string[] = ['correoUsuario', 'asunto', 'estado', 'creadoEn', 'accion'];

  dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  adminService = inject(AdminService);

  router = inject(Router);

  ngOnInit() {
    this.listar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listar() {
    this.adminService.listarTickets().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  responder(ticket: Ticket) {
    this.router.navigate(['/admin/tickets', ticket.id]);
  }
}
