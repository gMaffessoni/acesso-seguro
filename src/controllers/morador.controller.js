import MoradorDataAccess from '../data_access/morador.da.js';

class MoradorController {
  
  async index(req, res) {
    const moradores = await MoradorDataAccess.getAll();
    return res.inertia('Moradores/Index', { moradores, showModalCadastro: false });
  }

  async create(req, res) {
    const resultado = await MoradorDataAccess.create(req.body);

    switch (resultado.status) {
      case 'ok':
        req.session.flash = { success: "Morador cadastrado com sucesso!" };
        return res.redirect('/moradores');
      case 'error':
        req.session.flash = { error: "Erro ao salvar os dados do morador." }; 
        return res.redirect('/moradores');
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const resultado = await MoradorDataAccess.update(id, req.body);

    switch (resultado.status) {
      case 'ok':
        req.session.flash = { success: "Cadastro atualizado!" };
        return res.redirect(303, '/moradores');
      case 'error':
      case 'not_found':
        req.session.flash = { error: "Não foi possível atualizar." };
        return res.redirect(303, '/moradores');
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletado = await MoradorDataAccess.delete(id);
    
    if (deletado) {
      req.session.flash = { success: "Morador removido do sistema." };
    } else {
      req.session.flash = { error: "Erro ao remover morador." };
    }
    return res.redirect(303, '/moradores');
  }
}

export default new MoradorController();