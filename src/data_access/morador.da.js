import Morador from '../models/morador.model.js';

class MoradorDataAccess {
  async getAll() {
    return await Morador.findAll();
  }

  async getById(id) {
    return await Morador.findByPk(id);
  }

  async create(data) {
    try {
      const novo = await Morador.create(data);
      return { status: 'ok', data: novo }; 
    } catch (error) {
      return { status: 'error', error: error }; 
    }
  }

  async update(id, data) {
    try {
      const morador = await Morador.findByPk(id);
      if (!morador) return { status: 'not_found' };
      const atualizado = await morador.update(data);
      return { status: 'ok', data: atualizado };
    } catch (error) {
      return { status: 'error', error: error };
    }
  }

  async delete(id) {
    const morador = await Morador.findByPk(id);
    if (!morador) return false;
    await morador.destroy();
    return true;
  }
}

export default new MoradorDataAccess();