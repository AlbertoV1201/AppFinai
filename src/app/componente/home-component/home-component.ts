import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MovimientoService } from '../../services/movimiento-service';
import { Movimiento } from '../../model/movimiento';

@Component({
  selector: 'app-home-component',
  imports: [
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
    DatePipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements AfterViewInit {
  resumen: any = null;
  displayedColumns: string[] = [
    'id',
    'tipo',
    'monto',
    'creadoEn'];
  dataSource: MatTableDataSource<Movimiento> = new MatTableDataSource<Movimiento>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  movimientoService = inject(MovimientoService);
  router: Router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.cargarResumen();
  }

  cargarResumen() {
    this.movimientoService.resumen().subscribe({
      next: data => {
        this.resumen = data;
        this.dataSource.data = data.movimientos;
        this.dataSource._updateChangeSubscription();
      },
    });
  }

  irRegistrar(tipo: string) {
    this.router.navigate(['/registrar', tipo]);
  }
}
