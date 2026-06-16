import { router } from '@inertiajs/react';

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-3xl w-full">
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏢</div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Acesso Seguro</h1>
          <p className="text-slate-500 text-lg">Sistema de Controle de Portaria Integrado</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Card Moradores */}
          <button 
            onClick={() => router.get('/moradores')}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/5 transition-all text-left flex flex-col items-center text-center"
          >
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🏠
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Moradores</h2>
            <p className="text-sm text-slate-500">
              Gerencie cadastros, placas de veículos e numeração das casas.
            </p>
          </button>

          {/* Card Visitantes */}
          <button 
            onClick={() => router.get('/visitantes')}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/5 transition-all text-left flex flex-col items-center text-center"
          >
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🪪
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Visitantes & Histórico</h2>
            <p className="text-sm text-slate-500">
              Controle o acesso diário, registre entradas, saídas e tempo de visita.
            </p>
          </button>

        </div>

      </div>
    </div>
  );
}