import VisitanteDataAccess from '../data_access/visitante.da.js';

class VisitanteController {
  
  index = async (req, res) => {
    const visitantes = await VisitanteDataAccess.getAll();
    return res.inertia('Visitantes/Index', { visitantes, showModalCadastro: false });
  }

  new = async (req, res) => {
    const visitantes = await VisitanteDataAccess.getAll();
    return res.inertia('Visitantes/Index', { visitantes, showModalCadastro: true });
  }

  create = async (req, res) => {
    const data = { ...req.body };

    // Limpeza de dados
    if (data.cpf) data.cpf = data.cpf.replace(/\D/g, '');
    if (data.telefone) data.telefone = data.telefone.replace(/\D/g, '');

    // Validação básica
    const validationErrors = this._validate(data);
    if (Object.keys(validationErrors).length > 0) {
      req.session.errors = validationErrors;
      return res.redirect(303, '/visitantes');
    }

    const resultado = await VisitanteDataAccess.create(data);

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Visitante cadastrado com sucesso!" };
      return res.redirect(303, '/visitantes');
    } else {
      const errors = this._handleError(resultado.error);
      if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
      } else {
        req.session.flash = { error: "Erro ao salvar os dados do visitante." };
      }
      return res.redirect(303, '/visitantes');
    }
  }

  edit = async (req, res) => {
    const { id } = req.params;
    const visitante = await VisitanteDataAccess.getById(id);
    
    if (!visitante) return res.redirect('/visitantes');

    return res.inertia('Visitantes/Index', { 
      visitantes: await VisitanteDataAccess.getAll(), 
      visitanteProp: visitante, 
      showModalEdicao: true 
    });
  }

  update = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };

    // Limpeza de dados
    if (data.cpf) data.cpf = data.cpf.replace(/\D/g, '');
    if (data.telefone) data.telefone = data.telefone.replace(/\D/g, '');

    // Validação básica
    const validationErrors = this._validate(data);
    if (Object.keys(validationErrors).length > 0) {
      req.session.errors = validationErrors;
      return res.redirect(303, '/visitantes');
    }

    const resultado = await VisitanteDataAccess.update(id, data);

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Cadastro atualizado!" };
      return res.redirect(303, '/visitantes');
    } else if (resultado.status === 'not_found') {
      req.session.flash = { error: "Visitante não encontrado." };
      return res.redirect(303, '/visitantes');
    } else {
      const errors = this._handleError(resultado.error);
      if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
      } else {
        req.session.flash = { error: "Não foi possível atualizar." };
      }
      return res.redirect(303, '/visitantes');
    }
  }

  _validate = (data) => {
    const errors = {};
    if (!data.nome || data.nome.trim() === '') errors.nome = 'O nome é obrigatório.';
    if (!data.cpf || data.cpf.trim() === '') errors.cpf = 'O CPF é obrigatório.';
    if (data.cpf && data.cpf.length !== 11) errors.cpf = 'O CPF deve conter 11 dígitos.';
    return errors;
  }

  _handleError = (error) => {
    const errors = {};
    if (!error) return errors;

    if (error.name === 'SequelizeUniqueConstraintError') {
      error.errors.forEach(err => {
        if (err.path === 'cpf') errors.cpf = 'Este CPF já está cadastrado.';
        else errors[err.path] = 'Este valor já está em uso.';
      });
    } else if (error.name === 'SequelizeValidationError') {
      error.errors.forEach(err => {
        errors[err.path] = err.message;
      });
    }
    return errors;
  }

  inativar = async (req, res) => {
    const { id } = req.params;
    const resultado = await VisitanteDataAccess.update(id, { ativo: false });
    
    if (resultado.status === 'ok') {
      req.session.flash = { success: "Visitante inativado com sucesso." };
    } else {
      req.session.flash = { error: "Erro ao inativar visitante." };
    }
    return res.redirect(303, '/visitantes');
  }

  ativar = async (req, res) => {
    const { id } = req.params;
    const resultado = await VisitanteDataAccess.update(id, { ativo: true });
    
    if (resultado.status === 'ok') {
      req.session.flash = { success: "Visitante ativado com sucesso." };
    } else {
      req.session.flash = { error: "Erro ao ativar visitante." };
    }
    return res.redirect(303, '/visitantes');
  }
  
  registrarSaida = async (req, res) => {
    const { id } = req.params;
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