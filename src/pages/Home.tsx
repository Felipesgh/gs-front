import { useEffect, useState } from "react";
import { getRanking } from "../service/api";

export default function Home() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRanking()
      .then((data) => {
        setRanking(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">🏆 Ranking</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md border border-gray-200">
        {loading && <p>Carregando...</p>}

        {!loading && ranking.length === 0 && <p>Nenhum usuário encontrado.</p>}

        {!loading && ranking.length > 0 && (
          <div className="space-y-3">
            {ranking.map((u: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4 last:border-none"
              >
                {}
                <span className="text-lg font-semibold text-gray-800">
                  {index + 1}. {u.nome}
                </span>

                {}
                <span className="font-bold text-gray-900 text-lg ml-6">
                  {u.pontosTotais} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
