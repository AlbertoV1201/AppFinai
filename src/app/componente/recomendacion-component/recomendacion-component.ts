import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';

import { RecomendacionService } from '../../services/recomendacion-service';
import { Recomendacion } from '../../model/recomendacion';

@Component({
  selector: 'app-recomendacion-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './recomendacion-component.html',
  styleUrl: './recomendacion-component.css'
})
export class RecomendacionComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'titulo',
    'descripcionCorta',
    'categoria',
    'urlEnlace'
  ];

  dataSource = new MatTableDataSource<Recomendacion>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  private recomendacionService = inject(RecomendacionService);
  private router = inject(Router);

  ngOnInit(): void {
    this.listar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listar(): void {

    this.recomendacionService.listarFiscales().subscribe({

      next: (fiscales) => {

        this.recomendacionService.listarInversion().subscribe({

          next: (inversion) => {

            this.dataSource.data = [
              ...fiscales,
              ...inversion
            ];

          },

          error: (err) => {
            console.error(err);
          }

        });

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  regresar(): void {
    this.router.navigate(['/home']);
  }

}
