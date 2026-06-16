import { router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({
  visitantes = [],
  flash = {},
  showModalCadastro = false,
  showModalEdicao = false,
  visitanteForm = null,
  fieldErrors = null,
  dadosPreenchidos = null,
}) {
  const [abrirCadastro, setAbrirCadastro] = useState(showModalCadastro);
  const [abrirEdicao,   setAbrirEdicao]   = useState(showModalEdicao);
  const [excluindo,     setExcluindo]     = useState(null);

  useEffect(() => setAbrirCadastro(showModalCadastro), [showModalCadastro]);
  useEffect(() => setAbrirEdicao(showModalEdicao),     [showModalEdicao]);

  const novoForm = useForm({
    nome:     dadosPreenchidos?.nome     || '',
    cpf:      dadosPreenchidos?.cpf      || '',
    telefone: dadosPreenchidos?.telefone || '',
  });

  const editarForm = useForm({
    nome:     visitanteForm?.nome     || '',
    cpf:      visitanteForm?.cpf      || '',
    telefone: visitanteForm?.telefone || '',
  });

  // Atualiza os campos do formulário de edição quando o backend mandar os dados do visitante
  useEffect(() => {
    if (visitanteForm) {
      editarForm.setData({
        nome: visitanteForm.nome || '',
        cpf: visitanteForm.cpf || '',
        telefone: visitanteForm.telefone || '',
      });
    }
  }, [visitanteForm]);

  function cadastrar(e) {
    e.preventDefault();
    novoForm.post('/visitantes', {
      onSuccess: () => { 
        setAbrirCadastro(false); 
        novoForm.reset(); 
      },
    });
  }

  function atualizar(e) {
    e.preventDefault();
    editarForm.put(`/visitantes/${visitanteForm.id}`, {
      onSuccess: () => setAbrirEdicao(false),
    });
  }

  function excluir(v) {
    router.delete(`/visitantes/${v.id}`, {
      onSuccess: () => setExcluindo(null),
    });
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased text-slate-800">

      {/* ── Header ── */}
      <header className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-8 h-16 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔐</span>
          <div>
            <div className="text-lg font-bold tracking-wide">Acesso Seguro</div>
            <div className="text-xs text-slate-400">Controle de Visitantes</div>
          </div>
        </div>
        <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-medium">
          {visitantes.length} visitante(s)
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto my-8 px-4">

        {/* Notificações Flash */}
        {flash?.success && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg p-3.5 mb-4 flex items-center gap-2 text-sm shadow-sm animate-fade-in">
            <span>✅</span> {flash.success}
          </div>
        )}
        {flash?.error && (
          <div className="bg-rose-50 text-rose-800 border border-rose-200 rounded-lg p-3.5 mb-4 flex items-center gap-2 text-sm shadow-sm animate-fade-in">
            <span>❌</span> {flash.error}
          </div>
        )}

        {/* Tabela Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Visitantes cadastrados</h2>
              <p className="text-xs text-slate-400 mt-0.5">{visitantes.length} registro(s)</p>
            </div>
            <button 
              className="bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors shadow-sm"
              onClick={() => setAbrirCadastro(true)}
            >
              + Novo Visitante
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  {['#', 'Nome', 'CPF', 'Telefone', 'Ações'].map((h, idx) => (
                    <th key={h} className={`p-4 ${idx === 0 ? 'w-12 text-center' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {visitantes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400 italic">
                      Nenhum visitante cadastrado ainda.
                    </td>
                  </tr>
                ) : (
                  visitantes.map((v, i) => (
                    <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-center text-slate-400 font-mono">{i + 1}</td>
                      <td className="p-4 font-semibold text-slate-950">{v.nome}</td>
                      <td className="p-4 font-mono text-slate-600">{v.cpf}</td>
                      <td className="p-4 text-slate-600">{v.telefone || '—'}</td>
                      <td className="p-4 space-x-2">
                        <a 
                          href={`/visitantes/${v.id}/editar`} 
                          className="inline-block bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-medium px-3 py-1.5 rounded-md text-xs transition-colors"
                        >
                          Editar
                        </a>
                        <button 
                          onClick={() => setExcluindo(v)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium px-3 py-1.5 rounded-md text-xs transition-colors"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── Modal: Cadastro ── */}
      {abrirCadastro && (
        <Modal titulo="Novo Visitante" onClose={() => setAbrirCadastro(false)}>
          <form onSubmit={cadastrar} className="space-y-4">
            <Campo label="Nome completo" value={novoForm.data.nome} onChange={v => novoForm.setData('nome', v)} error={novoForm.errors.nome} />
            <Campo label="CPF" value={novoForm.data.cpf} onChange={v => novoForm.setData('cpf', v)} error={novoForm.errors.cpf} />
            <Campo label="Telefone" value={novoForm.data.telefone} onChange={v => novoForm.setData('telefone', v)} />
            {fieldErrors && <p className="text-xs text-rose-600 font-medium mt-1">{fieldErrors}</p>}
            <Rodape>
              <button type="button" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => setAbrirCadastro(false)}>Cancelar</button>
              <button type="submit" className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50" disabled={novoForm.processing}>
                {novoForm.processing ? 'Salvando…' : 'Cadastrar'}
              </button>
            </Rodape>
          </form>
        </Modal>
      )}

      {/* ── Modal: Edição ── */}
      {abrirEdicao && visitanteForm && (
        <Modal titulo="Editar Visitante" onClose={() => setAbrirEdicao(false)}>
          <form onSubmit={atualizar} className="space-y-4">
            <Campo label="Nome completo" value={editarForm.data.nome} onChange={v => editarForm.setData('nome', v)} error={editarForm.errors.nome} />
            <Campo label="CPF" value={editarForm.data.cpf} onChange={v => editarForm.setData('cpf', v)} error={editarForm.errors.cpf} />
            <Campo label="Telefone" value={editarForm.data.telefone} onChange={v => editarForm.setData('telefone', v)} />
            <Rodape>
              <button type="button" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => setAbrirEdicao(false)}>Cancelar</button>
              <button type="submit" className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50" disabled={editarForm.processing}>
                {editarForm.processing ? 'Salvando…' : 'Atualizar'}
              </button>
            </Rodape>
          </form>
        </Modal>
      )}

      {/* ── Modal: Confirmação de exclusão ── */}
      {excluindo && (
        <Modal titulo="Confirmar exclusão" onClose={() => setExcluindo(null)}>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Deseja remover <strong className="text-slate-900 font-semibold">{excluindo.nome}</strong> do sistema? Esta ação não pode ser desfeita.
          </p>
          <Rodape>
            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => setExcluindo(null)}>Cancelar</button>
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors" onClick={() => excluir(excluindo)}>
              Confirmar exclusão
            </button>
          </Rodape>
        </Modal>
      )}

    </div>
  );
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function Modal({ titulo, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl border border-slate-100 overflow-hidden transform scale-100 transition-transform">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">{titulo}</h3>
          <button className="text-slate-400 hover:text-slate-600 text-lg transition-colors" onClick={onClose}>✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Campo({ label, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg text-sm bg-slate-50/50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-900/10 ${
          error ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-950'
        }`}
      />
      {error && <span className="text-xs text-rose-600 font-medium mt-0.5">{error}</span>}
    </div>
  );
}

function Rodape({ children }) {
  return <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100">{children}</div>;
}