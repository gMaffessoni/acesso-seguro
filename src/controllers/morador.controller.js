import MoradorDataAccess from '../data_access/morador.da.js';

class MoradorController {
  
  index = async (req, res) => {
    const moradores = await MoradorDataAccess.getAll();
    return res.inertia('Moradores/Index', { moradores, showModalCadastro: false });
  }

  new = async (req, res) => {
      const moradores = await MoradorDataAccess.getAll();
      return res.inertia('Moradores/Index', { moradores, showModalCadastro: true });
    }

  create = async (req, res) => {
    const data = { ...req.body };
    
    // Limpeza de dados (apenas números)
    if (data.cpf) data.cpf = data.cpf.replace(/\D/g, '');
    if (data.telefone) data.telefone = data.telefone.replace(/\D/g, '');

    // Validação básica
    const validationErrors = this._validate(data);
    if (Object.keys(validationErrors).length > 0) {
      req.session.flash = { error: "campos inválidos" };
      req.session.errors = validationErrors;
      return res.redirect(303, '/moradores');
    }

    const resultado = await MoradorDataAccess.create(data);

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Morador cadastrado com sucesso!" };
      return res.redirect(303, '/moradores');
    } else {
      const errors = this._handleError(resultado.error);
      if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
      } else {
        req.session.flash = { error: "Erro ao salvar os dados do morador." };
      }
      return res.redirect(303, '/moradores');
    }
  }

   edit = async (req, res) => {
    const { id } = req.params;
    const morador = await MoradorDataAccess.getById(id);
    
    if (!morador) return res.redirect('/moradores');

    return res.inertia('Moradores/Index', { 
      moradores: await MoradorDataAccess.getAll(), 
      moradorProp: morador, 
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
      req.session.flash = { error: "campos inválidos" };
      req.session.errors = validationErrors;
      return res.redirect(303, '/moradores');
    }

    const resultado = await MoradorDataAccess.update(id, data);

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Cadastro atualizado!" };
      return res.redirect(303, '/moradores');
    } else if (resultado.status === 'not_found') {
      req.session.flash = { error: "Morador não encontrado." };
      return res.redirect(303, '/moradores');
    } else {
      const errors = this._handleError(resultado.error);
      if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
      } else {
        req.session.flash = { error: "Não foi possível atualizar." };
      }
      return res.redirect(303, '/moradores');
    }
  }

  _validate = (data) => {
    const errors = {};
    if (!data.nome || data.nome.trim() === '') errors.nome = 'O nome é obrigatório.';
    if (!data.cpf || data.cpf.trim() === '') errors.cpf = 'O CPF é obrigatório.';
    if (data.cpf && data.cpf.length !== 11) errors.cpf = 'O CPF deve conter 11 dígitos.';
    if (!data.numero_casa || data.numero_casa.trim() === '') errors.numero_casa = 'O número da casa é obrigatório.';
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
    const resultado = await MoradorDataAccess.update(id, { 
      ativo: false, 
      data_inativo: new Date() 
    });

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Morador inativado com sucesso!" };
    } else {
      req.session.flash = { error: "Erro ao inativar morador." };
    }
    return res.redirect(303, '/moradores');
  }

  ativar = async (req, res) => {
    const { id } = req.params;
    const resultado = await MoradorDataAccess.update(id, { 
      ativo: true, 
      data_inativo: null 
    });

    if (resultado.status === 'ok') {
      req.session.flash = { success: "Morador ativado com sucesso!" };
    } else {
      req.session.flash = { error: "Erro ao ativar morador." };
    }
    return res.redirect(303, '/moradores');
  }
}

export default new MoradorController();