import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { MetaService } from '../../services/meta-service';
import { Meta } from '../../model/meta';

@Component({
  selector: 'app-meta-component',
  imports: [
    MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatPaginator, MatSort, MatSortHeader, MatButton,
  ],
  templateUrl: './meta-component.html',
  styleUrl: './meta-component.css',
})
export class MetaComponent implements AfterViewInit {
  lista: Meta[] = [];
  displayedColumns: string[] = ['nombreMeta', 'montoObjetivo'];
  dataSource: MatTableDataSource<Meta> = new MatTableDataSource<Meta>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  metaService = inject(MetaService);
  router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.metaService.list().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      },
    });
  }

  irCrear() {
    this.router.navigate(['/meta-nuevo']);
  }
}
