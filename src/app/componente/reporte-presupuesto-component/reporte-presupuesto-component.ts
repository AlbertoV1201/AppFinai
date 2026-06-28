import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { PresupuestoService } from '../../services/presupuesto-service';

@Component({
  selector: 'app-reporte-presupuesto-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte-presupuesto-component.html',
  styleUrl: './reporte-presupuesto-component.css',
})
export class ReportePresupuestoComponent implements OnInit {
  presupuestoService = inject(PresupuestoService);

  categorias: string[] = [];

  montos: number[] = [];

  constructor() {
    Chart.register(
      BarController,

      BarElement,

      CategoryScale,

      LinearScale,

      Title,

      Tooltip,

      Legend,
    );
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.presupuestoService.list().subscribe({
      next: (data) => {
        const categoriasMap = new Map<string, number>();

        data.forEach((presupuesto: any) => {
          const categoria = presupuesto.categoria?.trim() || 'Sin categoría';

          const monto = Number(presupuesto.montoPromedioMensual);

          if (categoriasMap.has(categoria)) {
            categoriasMap.set(categoria, categoriasMap.get(categoria)! + monto);
          } else {
            categoriasMap.set(categoria, monto);
          }
        });

        this.categorias = Array.from(categoriasMap.keys());

        this.montos = Array.from(categoriasMap.values());

        this.crearGrafico();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  crearGrafico(): void {
    new Chart('graficoCategorias', {
      type: 'bar',

      data: {
        labels: this.categorias,

        datasets: [
          {
            label: 'Monto total',

            data: this.montos,

            backgroundColor: [
              '#3B82F6',
              '#10B981',
              '#F59E0B',
              '#EF4444',
              '#8B5CF6',
              '#06B6D4',
              '#EC4899',
              '#84CC16',
            ],

            borderColor: [
              '#2563EB',
              '#059669',
              '#D97706',
              '#DC2626',
              '#7C3AED',
              '#0891B2',
              '#DB2777',
              '#65A30D',
            ],

            borderWidth: 2,

            borderRadius: 10,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          title: {
            display: true,

            text: 'Monto Total por Categoría',

            font: {
              size: 22,
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
