import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPut, apiDelete } from "../service/api";

interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

export default function UsuarioCrud() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<Usuario>({ nome: "", email: "", senha: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarUsuarios() {
    setLoading(true);
    const data = await apiGet("/usuario");
    setUsuarios(data);
    setLoading(false);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    if (editingId === null) {
      await apiPost("/usuario", form);
    } else {
      await apiPut(`/usuario/${editingId}`, form);
      setEditingId(null);
    }

    setForm({ nome: "", email: "", senha: "" });
    carregarUsuarios();
  }

  async function editar(usuario: Usuario) {
    setEditingId(usuario.id!);
    setForm(usuario);
  }

  async function deletar(id: number) {
    await apiDelete(`/usuario/${id}`);
    carregarUsuarios();
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

      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Gerenciar Usuários
      </h2>

      {}
      <form
        onSubmit={salvar}
        className="space-y-3 mb-10 p-4 bg-gray-100 rounded-xl shadow-inner"
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome do usuário"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          {editingId ? "Salvar Alterações" : "Cadastrar Usuário"}
        </button>
      </form>

      {}
      {loading ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b font-semibold text-gray-600">
              <th className="py-2 text-left">Nome</th>
              <th className="text-left">Email</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{u.nome}</td>
                <td>{u.email}</td>
                <td className="py-2 flex gap-2 justify-end">

                  {}
                  <button
                    onClick={() => editar(u)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
                  >
                    Editar
                  </button>

                  {}
                  <button
                    onClick={() => u.id && deletar(u.id)}
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
