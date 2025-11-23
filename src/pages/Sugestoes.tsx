import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  nome: string;
  categoria: string;
  sugestao: string;
};

export default function Sugestoes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    alert('Sugestão enviada! Obrigado '+data.nome);
    reset();
    navigate("/");
  };

  return (
    <section className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">
        Envie sua Sugestão de Missão 💡
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-6 border border-highlight/30">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {}
          <label className="block mb-2 font-medium">Nome</label>
          <input
            {...register("nome", { required: "Nome é obrigatório" })}
            className="w-full p-2 border rounded mb-1 focus:ring-2 focus:ring-highlight outline-none"
            placeholder="Digite seu nome"
          />
          {errors.nome && (
            <div className="text-red-600 mb-2">{errors.nome.message}</div>
          )}

          {}
          <label className="block mb-2 font-medium mt-4">Categoria</label>
          <select
            {...register("categoria", { required: "Selecione uma categoria" })}
            className="w-full p-2 border rounded mb-1 focus:ring-2 focus:ring-highlight outline-none bg-white"
          >
            <option value="">Selecione...</option>
            <option value="produtividade">Produtividade</option>
            <option value="saúde">Saúde</option>
            <option value="bem-estar">Bem-estar</option>
            <option value="outros">Outros</option>
          </select>
          {errors.categoria && (
            <div className="text-red-600 mb-2">{errors.categoria.message}</div>
          )}

          {}
          <label className="block mb-2 font-medium mt-4">
            Sugestão de Missão
          </label>
          <textarea
            {...register("sugestao", {
              required: "Sugestão é obrigatória",
              minLength: {
                value: 5,
                message: "Descreva um pouco mais sua sugestão",
              },
            })}
            className="w-full p-2 border rounded mb-1 focus:ring-2 focus:ring-highlight outline-none"
            rows={5}
            placeholder="Descreva sua sugestão de missão diária..."
          />
          {errors.sugestao && (
            <div className="text-red-600 mb-2">{errors.sugestao.message}</div>
          )}

          {}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-highlight transition-colors duration-300"
            >
              Enviar Sugestão
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
