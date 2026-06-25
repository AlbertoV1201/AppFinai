import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { PresupuestoService } from '../../services/presupuesto-service';
import { Presupuesto } from '../../model/presupuesto';

@Component({
  selector: 'app-presupuesto-component',
  imports: [
    MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatPaginator, MatSort, MatSortHeader, MatButton,
  ],
  templateUrl: './presupuesto-component.html',
  styleUrl: './presupuesto-component.css',
})
export class PresupuestoComponent implements AfterViewInit {
  lista: Presupuesto[] = [];
  displayedColumns: string[] = ['nombrePresupuesto', 'montoPromedioMensual'];
  dataSource: MatTableDataSource<Presupuesto> = new MatTableDataSource<Presupuesto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  presupuestoService = inject(PresupuestoService);
  router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.presupuestoService.list().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      },
    });
  }

  irCrear() {
    this.router.navigate(['/presupuesto-nuevo']);
  }
}
