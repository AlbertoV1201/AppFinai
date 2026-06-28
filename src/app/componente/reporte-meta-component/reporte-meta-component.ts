import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Chart,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title
} from 'chart.js';

import { MetaService } from '../../services/meta-service';

@Component({
  selector: 'app-reporte-meta-component',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './reporte-meta-component.html',
  styleUrl: './reporte-meta-component.css',
})
export class ReporteMetaComponent implements OnInit {

  metaService = inject(MetaService);

  estados: string[] = [];

  cantidades: number[] = [];

  constructor(){

    Chart.register(
      PieController,
      ArcElement,
      Legend,
      Tooltip,
      Title
    );

  }

  ngOnInit(): void {

    this.cargarDatos();

  }

  cargarDatos(): void {

    this.metaService.list().subscribe({

      next: (data) => {

        const estadosMap = new Map<string, number>();

        data.forEach((meta: any) => {

          const estado = meta.estado || 'SIN ESTADO';

          if(estadosMap.has(estado)){

            estadosMap.set(
              estado,
              estadosMap.get(estado)! + 1
            );

          }else{

            estadosMap.set(estado,1);

          }

        });

        this.estados = Array.from(estadosMap.keys());

        this.cantidades = Array.from(estadosMap.values());

        this.crearGrafico();

      },

      error:(err)=>{

        console.error(err);

      }

    });

  }
  crearGrafico(){

    new Chart("graficoMetas",{

      type:'pie',

      data:{

        labels:this.estados,

        datasets:[

          {

            data:this.cantidades,

            backgroundColor:[

              '#10B981',

              '#3B82F6',

              '#F59E0B',

              '#EF4444'

            ],

            borderColor:'#ffffff',

            borderWidth:3

          }

        ]

      },

      options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

          title:{

            display:true,

            text:'Distribución de Metas por Estado',

            font:{

              size:22

            }

          },

          legend:{

            position:'bottom'

          }

        }

      }

    });

  }
}
