import { useState } from "react";

type Partida = {
  data: string;
  local: string;
  horario: string;
  jogadoresPorTime: number;
  goleiroFixo: boolean;
};

type Props = {
  onCriarPartida: (partida: Partida) => void;
};

export default function CriarPartida({ onCriarPartida }: Props) {
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");
  const [jogadoresPorTime, setJogadoresPorTime] = useState(5);
  const [goleiroFixo, setGoleiroFixo] = useState(true);

  const criarPartida = () => {
    if (!data || !local || !horario) return;

    onCriarPartida({
      data,
      local,
      horario,
      jogadoresPorTime,
      goleiroFixo,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded mb-4">
      <h2 className="text-xl font-semibold mb-4">Criar Nova Partida</h2>

      <div className="flex flex-col gap-3">
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          placeholder="Local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />

        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />

<label className="flex flex-col">
  <span className="mb-1 font-medium">Qtd. de jogadores de linha por time</span>
  <input
    type="number"
    min={1}
    max={11}
    value={jogadoresPorTime}
    onChange={(e) => setJogadoresPorTime(Number(e.target.value))}
    className="border border-gray-300 p-2 rounded w-48"
  />
</label>


        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={goleiroFixo}
            onChange={() => setGoleiroFixo(!goleiroFixo)}
          />
          Goleiro fixo?
        </label>

        <button
          onClick={criarPartida}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Criar Partida
        </button>
      </div>
    </div>
  );
}
