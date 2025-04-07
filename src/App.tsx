import { useState } from "react";
import CriarPartida from "./components/CriarPartida";
import CadastroJogador from "./components/CadastroJogador";

function App() {
  const [partida, setPartida] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CriarPartida onCriarPartida={setPartida} />

      {partida && <CadastroJogador configPartida={partida} />}
    </div>
  );
}

export default App;