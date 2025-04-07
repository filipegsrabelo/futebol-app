import { useState } from "react";

type Jogador = {
  nome: string;
  posicao: "Linha" | "Gol";
};

type ConfigPartida = {
  data: string;
  local: string;
  horario: string;
  jogadoresPorTime: number;
  goleiroFixo: boolean;
};

type Props = {
  configPartida: ConfigPartida;
};

export default function CadastroJogador({ configPartida }: Props) {
  const [nome, setNome] = useState("");
  const [posicao, setPosicao] = useState<"Linha" | "Gol">("Linha");
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [times, setTimes] = useState<Jogador[][]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);

  const adicionarOuEditarJogador = () => {
    if (!nome.trim()) return;

    const novoJogador: Jogador = { nome, posicao };

    if (modoEdicao && indexEdicao !== null) {
      const novaLista = [...jogadores];
      novaLista[indexEdicao] = novoJogador;
      setJogadores(novaLista);
      setModoEdicao(false);
      setIndexEdicao(null);
    } else {
      setJogadores([...jogadores, novoJogador]);
    }

    setNome("");
    setPosicao("Linha");
    setTimes([]);
  };

  const editarJogador = (index: number) => {
    const jogador = jogadores[index];
    setNome(jogador.nome);
    setPosicao(jogador.posicao);
    setModoEdicao(true);
    setIndexEdicao(index);
    setTimes([]);
  };

  const removerJogador = (index: number) => {
    const novaLista = [...jogadores];
    novaLista.splice(index, 1);
    setJogadores(novaLista);
    setTimes([]);
  };

  const montarTimes = () => {
    const linha = jogadores.filter((j) => j.posicao === "Linha");
    const goleiros = jogadores.filter((j) => j.posicao === "Gol");
  
    const jogadoresPorTime = configPartida.jogadoresPorTime;
    const time1: Jogador[] = [];
    const time2: Jogador[] = [];
  
    // Alternância entre time 1 e 2
    for (let i = 0; i < linha.length; i++) {
      if (time1.length < jogadoresPorTime && time2.length < jogadoresPorTime) {
        (i % 2 === 0 ? time1 : time2).push(linha[i]);
      } else {
        break;
      }
    }
  
    // Jogadores restantes (linha) vão preenchendo novos times
    const usados = [...time1, ...time2];
    const restantes = linha.filter((j) => !usados.includes(j));
  
    const outrosTimes: Jogador[][] = [];
    let tempTime: Jogador[] = [];
  
    restantes.forEach((jogador, index) => {
      tempTime.push(jogador);
      if (tempTime.length === jogadoresPorTime) {
        outrosTimes.push(tempTime);
        tempTime = [];
      }
    });
  
    // Adiciona time incompleto, se sobrar jogador
    if (tempTime.length > 0) {
      outrosTimes.push(tempTime);
    }
  
    // Inicia lista final de times com Time 1 e Time 2
    const novosTimes = [time1, time2, ...outrosTimes];
  
    // Goleiro fixo: distribui 1 por time se possível
    if (configPartida.goleiroFixo) {
      goleiros.forEach((goleiro, i) => {
        if (i < novosTimes.length) {
          novosTimes[i].unshift(goleiro);
        }
      });
    }
  
    setTimes(novosTimes);
  };
  
  
  

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        {modoEdicao ? "Editar Jogador" : "Cadastro de Jogadores"}
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome do jogador"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />

        <select
          value={posicao}
          onChange={(e) => setPosicao(e.target.value as "Linha" | "Gol")}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="Linha">Linha</option>
          <option value="Gol">Gol</option>
        </select>

        <button
          onClick={adicionarOuEditarJogador}
          className={`${
            modoEdicao ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded`}
        >
          {modoEdicao ? "Salvar Edição" : "Adicionar Jogador"}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Jogadores cadastrados:</h3>
        <ul className="list-decimal list-inside space-y-2">
          {jogadores.map((jogador, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {jogador.nome} — {jogador.posicao}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => editarJogador(index)}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => removerJogador(index)}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button
          onClick={montarTimes}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Montar Times
        </button>
      </div>

      {times.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Times montados:</h3>
          {times.map((time, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold">Time {index + 1}</h4>
              <ul className="list-disc list-inside ml-4">
                {time.map((jogador, j) => (
                  <li key={j}>
                    {jogador.nome} — {jogador.posicao}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
