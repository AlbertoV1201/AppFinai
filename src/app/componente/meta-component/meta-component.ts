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
import { MatButton } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MetaService } from '../../services/meta-service';
import { Meta } from '../../model/meta';

@Component({
  selector: 'app-meta-component',
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
    MatButton,
    MatProgressBarModule,
  ],
  templateUrl: './meta-component.html',
  styleUrl: './meta-component.css',
})
export class MetaComponent implements AfterViewInit {
  lista: Meta[] = [];

  displayedColumns: string[] = [
    'nombreMeta',
    'montoObjetivo',
    'montoActual',
    'estado',
    'fechaLimite',
    'avance',
  ];

  dataSource: MatTableDataSource<Meta> = new MatTableDataSource<Meta>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  metaService = inject(MetaService);

  router = inject(Router);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.metaService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;

        this.dataSource._updateChangeSubscription();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  irCrear(): void {
    this.router.navigate(['/meta-nuevo']);
  }

  calcularAvance(meta: Meta): number {
    if (meta.montoObjetivo == null || meta.montoObjetivo <= 0) {
      return 0;
    }

    const porcentaje = (meta.montoActual * 100) / meta.montoObjetivo;

    return Math.min(Math.round(porcentaje), 100);
  }

  obtenerEstado(meta: Meta): string {
    if (meta.estado === 'COMPLETADA') {
      return '🟢 Completada';
    }

    return '🟡 Activa';
  }
}
