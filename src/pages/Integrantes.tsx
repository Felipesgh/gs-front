import { useEffect, useState } from "react"
import IntegranteCard, { type IntegranteProps } from "../components/IntegrantesCard"

import FelipeImg from "../assets/Felipe.png"
import AguinelImg from "../assets/Aguinel.jpg"
import VitorImg from "../assets/Vitor.jpg"

export default function Integrantes() {
  const [members, setMembers] = useState<IntegranteProps[]>([])

  useEffect(() => {
    setMembers([
      {
        id: "1",
        name: "Felipe Garcia",
        rm: "563485",
        turma: "1TDSA",
        img: FelipeImg,
      },
      {
        id: "2",
        name: "Aguinel Bento",
        rm: "564857",
        turma: "1TDSA",
        img: AguinelImg,
      },
      {
        id: "3",
        name: "Vitor Mendes",
        rm: "565376",
        turma: "1TDSA",
        img: VitorImg,
      },
    ])
  }, [])

  return (
    <section className="max-w-4xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">
        Integrantes
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((m) => (
          <IntegranteCard key={m.id} {...m} />
        ))}
      </div>
    </section>
  )
}