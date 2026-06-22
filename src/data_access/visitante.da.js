import Visitante from '../models/visitante.model.js';

class VisitanteDataAccess {
  async getAll() {
    return await Visitante.findAll();
  }

  async getById(id) {
    return await Visitante.findByPk(id);
  }

  async create(data) {
    try {
      const novo = await Visitante.create(data);
      return { status: 'ok', data: novo };
    } catch (error) {
      return { status: 'error', error: error };
    }
  }

  async update(id, data) {
    try {
      const visitante = await Visitante.findByPk(id);
      if (!visitante) return { status: 'not_found' };
      const atualizado = await visitante.update(data);
      return { status: 'ok', data: atualizado };
    } catch (error) {
      return { status: 'error', error: error };
    }
  }

  async delete(id) {
    const visitante = await Visitante.findByPk(id);
    if (!visitante) return false;
    await visitante.destroy();
    return true;
  }
}

export default new VisitanteDataAccess();