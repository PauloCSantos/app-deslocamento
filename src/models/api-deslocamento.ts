export interface Deslocamento {
  id?: number;
  kmInicial?: number;
  kmFinal?: number;
  inicioDeslocamento?: Date;
  fimDeslocamento?: Date;
  checkList?: string;
  motivo?: string;
  observacao?: string;
  idCondutor?: number;
  idVeiculo?: number;
  idCliente?: number;
}
