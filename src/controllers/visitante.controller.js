import VisitanteDataAccess from '../data_access/visitante.da.js';

class VisitanteController {
  
  async index(req, res) {
    const visitantes = await VisitanteDataAccess.getAll();
    return res.inertia('Visitantes/Index', { visitantes, showModalCadastro: false });
  }

  async new(req, res) {
    const visitantes = await VisitanteDataAccess.getAll();
    return res.inertia('Visitantes/Index', { visitantes, showModalCadastro: true });
  }

  async create(req, res) {
    const resultado = await VisitanteDataAccess.create(req.body);

    switch (resultado.status) {
      case 'ok':
        req.session.flash = { success: "Visitante cadastrado com sucesso!" };
        return res.redirect('/visitantes');
        
      case 'error':
        req.session.flash = { error: "Erro ao salvar os dados do visitante." }; 
        return res.inertia('Visitantes/Index', {
          visitantes: await VisitanteDataAccess.getAll(),
          showModalCadastro: true,
          fieldErrors: resultado.errors,
          dadosPreenchidos: req.body
        });
    }
  }

  async edit(req, res) {
    const { id } = req.params;
    const visitantes = await VisitanteDataAccess.getAll();
    const visitante = await VisitanteDataAccess.getById(id);
    
    if (!visitante) return res.redirect('/visitantes');

    return res.inertia('Visitantes/Index', { 
      visitantes, 
      visitanteForm: visitante, 
      showModalEdicao: true 
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const resultado = await VisitanteDataAccess.update(id, req.body);

    switch (resultado.status) {
      case 'ok':
        req.session.flash = { success: "Cadastro atualizado!" };
        return res.redirect(303,'/visitantes');
      case 'error':
      case 'not_found':
        req.session.flash = { error: "Não foi possível atualizar." };
        return res.redirect(303,'/visitantes');
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletado = await VisitanteDataAccess.delete(id);
    
    if (deletado) {
      req.session.flash = { success: "Visitante removido do sistema." };
    } else {
      req.session.flash = { error: "Erro ao remover visitante." };
    }
    return res.redirect(303,'/visitantes');
  }
  
  async registrarSaida(req, res) {
    const { id } = req.params;
    // Pega a data e hora atual
    const resultado = await VisitanteDataAccess.update(id, { hora_saida: new Date() });

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Saída registrada com sucesso!" };
    } else {
      req.session.flash = { error: "Erro ao registrar saída." };
    }
    return res.redirect(303, '/visitantes');
  }
}

export default new VisitanteController();