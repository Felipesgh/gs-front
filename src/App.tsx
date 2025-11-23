import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import IntegranteDetail from "./pages/IntegrantesDetail";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Sugestoes from "./pages/Sugestoes";
import Gerenciamento from "./pages/Gerenciamento";
import UsuarioCrud from "./pages/UsuarioCrud";
import TarefaCrud from "./pages/TarefaCrud";
import MissaoDiariaCrud from "./pages/MissaoDiariaCrud";



function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrante/:id" element={<IntegranteDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sugestoes" element={<Sugestoes />} />
          <Route path="/gerenciamento" element={<Gerenciamento />} />
          <Route path="/gerenciamento/usuarios" element={<UsuarioCrud />} />
          <Route path="/gerenciamento/tarefas" element={<TarefaCrud />} />
          <Route path="/gerenciamento/missoes" element={<MissaoDiariaCrud />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
