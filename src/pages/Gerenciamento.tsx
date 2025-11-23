import { Link } from "react-router-dom";

export default function Gerenciamento() {
  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-10">Painel de Gerenciamento</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {}
        <Link
          to="/gerenciamento/usuarios"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform"
        >
          <h2 className="text-xl font-semibold mb-2">Gerenciar Usuários</h2>
          <p className="text-gray-600">Cadastrar, listar e atualizar usuários.</p>
        </Link>

        {}
        <Link
          to="/gerenciamento/tarefas"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform"
        >
          <h2 className="text-xl font-semibold mb-2">Gerenciar Tarefas</h2>
          <p className="text-gray-600">Criar e administrar tarefas.</p>
        </Link>

        {}
        <Link
          to="/gerenciamento/missoes"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform"
        >
          <h2 className="text-xl font-semibold mb-2">Missões Diárias</h2>
          <p className="text-gray-600">Gerenciar missões e desafios.</p>
        </Link>

      </div>
    </div>
  );
}
