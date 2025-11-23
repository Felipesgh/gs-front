import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPut, apiDelete } from "../service/api";

interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  pontuacao: number;
}

export default function TarefaCrud() {
  const navigate = useNavigate();

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [form, setForm] = useState<Tarefa>({ titulo: "", descricao: "", pontuacao: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarTarefas() {
    setLoading(true);
    const data = await apiGet("/tarefa");
    setTarefas(data);
    setLoading(false);
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    const payload = { 
      ...form, 
      pontuacao: Number(form.pontuacao),
      usuarioId: 1   // usuário padrão por enquanto
    };


    if (editingId === null) {
      await apiPost("/tarefa", payload);
    } else {
      await apiPut(`/tarefa/${editingId}`, payload);
      setEditingId(null);
    }

    setForm({ titulo: "", descricao: "", pontuacao: 0 });
    carregarTarefas();
  }

  async function editar(tarefa: Tarefa) {
    setEditingId(tarefa.id!);
    setForm(tarefa);
  }

  async function deletar(id: number) {
    await apiDelete(`/tarefa/${id}`);
    carregarTarefas();
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">

      {}
      <button
        onClick={() => navigate("/gerenciamento")}
        className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-sm"
      >
        ← Voltar ao Gerenciamento
      </button>

      <h2 className="text-2xl font-bold mb-6 text-blue-600">Gerenciar Tarefas</h2>

      {}
      <form onSubmit={salvar} className="space-y-3 mb-10 p-4 bg-gray-100 rounded-xl shadow-inner">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="pontuacao"
          placeholder="Pontos"
          value={form.pontuacao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          {editingId ? "Salvar Alterações" : "Cadastrar Tarefa"}
        </button>
      </form>

      {}
      {loading ? (
        <p>Carregando...</p>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b font-semibold text-gray-600">
              <th className="py-2 text-left">Título</th>
              <th className="text-left">Descrição</th>
              <th className="text-left">Pontos</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{t.titulo}</td>
                <td>{t.descricao}</td>
                <td>{t.pontuacao}</td>
                <td className="py-2 flex gap-2 justify-end">

                  <button
                    onClick={() => editar(t)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => t.id && deletar(t.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Excluir
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
