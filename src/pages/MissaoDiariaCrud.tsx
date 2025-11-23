import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPut, apiDelete } from "../service/api";

export default function MissaoDiariaCrud() {
  const navigate = useNavigate();

  const [missoes, setMissoes] = useState<any[]>([]);
  const [form, setForm] = useState({
    id: "",
    titulo: "",
    descricao: "",
    pontos: 0,
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    const data = await apiGet("/missao");
    setMissoes(data);
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "pontuacao" ? Number(value) : value });
  }

  async function salvar(e: any) {
    e.preventDefault();

    const payload = {
      ...form,
      id: form.id ? Number(form.id) : undefined,
      usuarioId: 1,
    };

    if (editando && payload.id) {
      await apiPut(`/missao/${payload.id}`, payload);
    } else {
      await apiPost("/missao", payload);
    }

    setForm({ id: "", titulo: "", descricao: "", pontos: 0 });
    setEditando(false);
    carregar();
  }

  function editar(m: any) {
    setForm({ ...m });
    setEditando(true);
  }

  async function excluir(id: number) {
    await apiDelete(`/missao/${id}`);
    carregar();
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <button
        onClick={() => navigate("/gerenciamento")}
        className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-sm"
      >
        ← Voltar ao Gerenciamento
      </button>

      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Gerenciar Missões Diárias
      </h1>

      <form
        onSubmit={salvar}
        className="bg-gray-100 p-4 rounded-xl shadow-inner mb-10 space-y-3"
      >
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título da Missão"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição da Missão"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="pontos"
          value={form.pontos}
          onChange={handleChange}
          placeholder="Pontuação"
          className="w-full p-2 border rounded"
          required
          min={0}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow">
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {loading ? (
        <p>Carregando missões...</p>
      ) : missoes.length === 0 ? (
        <p>Nenhuma missão cadastrada.</p>
      ) : (
        <div className="space-y-4">
          {missoes.map((m) => (
            <div
              key={m.id}
              className="bg-white shadow p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{m.titulo}</h3>
                <p className="text-gray-700">{m.descricao}</p>
                <p className="mt-1 text-sm font-semibold">
                  Pontos: <span className="text-blue-600">{m.pontos}</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editar(m)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => excluir(m.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
