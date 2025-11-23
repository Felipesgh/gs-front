import { useState } from "react";

const perguntas = [
  { q: "Como ganho pontos?", a: "Ao concluir tarefas diárias cadastradas no sistema." },
  { q: "Posso criar minhas próprias metas?", a: "Sim! Você pode adicionar tarefas personalizadas." },
  { q: "Existe um ranking global?", a: "Sim, há um ranking com os usuários mais produtivos." },
];

export default function FAQ() {
  const [ativo, setAtivo] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">❓ Perguntas Frequentes</h2>
      <div className="space-y-4">
        {perguntas.map((p, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <button
              onClick={() => setAtivo(ativo === i ? null : i)}
              className="w-full text-left font-semibold text-secondary"
            >
              {p.q}
            </button>
            {ativo === i && <p className="mt-2 text-slate-600">{p.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
