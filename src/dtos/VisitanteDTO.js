export default class VisitanteDTO {
  static fromRequest(body = {}) {
    const dto = {};

    if (body.nome !== undefined) dto.nome = this._text(body.nome);
    if (body.cpf !== undefined) dto.cpf = this._digits(body.cpf);
    if (body.telefone !== undefined) dto.telefone = this._digits(body.telefone);
    if (body.placa_carro !== undefined) dto.placa_carro = this._text(body.placa_carro).toUpperCase();
    if (body.tempo_visita !== undefined) dto.tempo_visita = this._text(body.tempo_visita);
    if (body.hora_entrada !== undefined) dto.hora_entrada = body.hora_entrada;
    if (body.hora_saida !== undefined) dto.hora_saida = body.hora_saida;
    if (body.ativo !== undefined) dto.ativo = this._boolean(body.ativo);

    return dto;
  }

  static _text(value) {
    return typeof value === 'string' ? value.trim() : value;
  }

  static _digits(value) {
    return typeof value === 'string' ? value.replace(/\D/g, '') : value;
  }

  static _boolean(value) {
    if (value === true || value === 'true' || value === 1 || value === '1') return true;
    if (value === false || value === 'false' || value === 0 || value === '0') return false;
    return value;
  }
}