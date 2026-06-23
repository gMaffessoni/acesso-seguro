export default class MoradorDTO {
  static fromRequest(body = {}) {
    const dto = {};

    if (body.nome !== undefined) dto.nome = this._text(body.nome);
    if (body.cpf !== undefined) dto.cpf = this._digits(body.cpf);
    if (body.telefone !== undefined) dto.telefone = this._digits(body.telefone);
    if (body.placa_carro !== undefined) dto.placa_carro = this._text(body.placa_carro).toUpperCase();
    if (body.numero_casa !== undefined) dto.numero_casa = this._text(body.numero_casa);
    if (body.ativo !== undefined) dto.ativo = this._boolean(body.ativo);
    if (body.data_inativo !== undefined) dto.data_inativo = body.data_inativo;

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