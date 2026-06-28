export class Ticket {
  id: number = 0;

  asunto: string = '';

  mensaje: string = '';

  estado: string = '';

  mensajeRespuesta: string = '';

  creadoEn: Date = new Date();

  respondidoEn: Date = new Date();

  usuarioId: number = 0;

  correoUsuario: string = '';

  respondidoPor: string = '';
}
