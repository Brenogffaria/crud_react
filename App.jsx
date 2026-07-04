import React, { useState } from "react";
import { Check, Pencil, Trash2, X, Plus } from "lucide-react";

const PRIORIDADES = {
  alta: { label: "Alta", badge: "bg-red-50 text-red-600 border-red-200", bar: "border-l-red-500" },
  media: { label: "Média", badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "border-l-amber-500" },
  baixa: { label: "Baixa", badge: "bg-sky-50 text-sky-700 border-sky-200", bar: "border-l-sky-500" },
};

const TAREFAS_INICIAIS = [
  {
    id: "1",
    titulo: "Estudar para a prova de programação web",
    descricao: "Revisar HTML, CSS e JavaScript.",
    prioridade: "alta",
    prazo: "",
    concluida: false,
  },
  {
    id: "2",
    titulo: "Organizar materiais da faculdade",
    descricao: "",
    prioridade: "baixa",
    prazo: "",
    concluida: true,
  },
];

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}`;
}

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState(TAREFAS_INICIAIS);
  const [filtro, setFiltro] = useState("todas");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [prazo, setPrazo] = useState("");

  const [tarefaEditando, setTarefaEditando] = useState(null);

  // ---------- CREATE ----------
  function criarTarefa(e) {
    e.preventDefault();
    const tituloLimpo = titulo.trim();
    if (!tituloLimpo) return;

    const nova = {
      id: gerarId(),
      titulo: tituloLimpo,
      descricao: descricao.trim(),
      prioridade,
      prazo,
      concluida: false,
    };

    setTarefas((prev) => [nova, ...prev]);
    setTitulo("");
    setDescricao("");
    setPrioridade("media");
    setPrazo("");
  }

  // ---------- UPDATE ----------
  function alternarConcluida(id) {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }

  function salvarEdicao(e) {
    e.preventDefault();
    setTarefas((prev) =>
      prev.map((t) => (t.id === tarefaEditando.id ? tarefaEditando : t))
    );
    setTarefaEditando(null);
  }

  // ---------- DELETE ----------
  function excluirTarefa(id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    }
  }

  // ---------- READ (com filtro) ----------
  const visiveis = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true;
  });

  const pendentesCount = tarefas.filter((t) => !t.concluida).length;

  return (
    <div className="min-h-screen bg-[#F5F6F2] text-[#232620] font-sans">
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Cabeçalho */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Minhas Tarefas
            </h1>
          </div>
          <span className="text-sm text-neutral-500">
            {tarefas.length === 0
              ? "nenhuma tarefa"
              : `${pendentesCount} pendente${pendentesCount !== 1 ? "s" : ""} de ${tarefas.length}`}
          </span>
        </header>

        {/* Formulário de nova tarefa */}
        <form
          onSubmit={criarTarefa}
          className="bg-white border border-neutral-200 rounded-xl p-4 mb-7"
        >
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="O que você precisa fazer?"
            maxLength={80}
            className="w-full border-0 border-b border-neutral-200 pb-3 pt-1 text-base font-medium placeholder-neutral-400 focus:outline-none focus:border-emerald-700 bg-transparent"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          />

          <div className="flex flex-wrap gap-2 mt-3">
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-[#F5F6F2] focus:outline-none focus:border-emerald-700"
            >
              <option value="baixa">Prioridade baixa</option>
              <option value="media">Prioridade média</option>
              <option value="alta">Prioridade alta</option>
            </select>

            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-[#F5F6F2] focus:outline-none focus:border-emerald-700"
            />

            <button
              type="submit"
              className="ml-auto flex items-center gap-1 bg-emerald-800 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition"
            >
              <Plus size={16} /> Adicionar
            </button>
          </div>

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Detalhes (opcional)"
            rows={2}
            className="w-full mt-3 border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-[#F5F6F2] focus:outline-none focus:border-emerald-700 resize-y"
          />
        </form>

        {/* Filtros */}
        <div className="flex gap-2 mb-5">
          {[
            { valor: "todas", label: "Todas" },
            { valor: "pendentes", label: "Pendentes" },
            { valor: "concluidas", label: "Concluídas" },
          ].map((f) => (
            <button
              key={f.valor}
              onClick={() => setFiltro(f.valor)}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition ${
                filtro === f.valor
                  ? "bg-emerald-50 border-emerald-700 text-emerald-800 font-semibold"
                  : "bg-white border-neutral-200 text-neutral-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista de tarefas */}
        {visiveis.length === 0 ? (
          <div className="text-center py-14 text-neutral-500">
            <p className="text-3xl mb-2">📋</p>
            <p>Nenhuma tarefa por aqui.</p>
            <p className="text-sm mt-1">Adicione uma no campo acima.</p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {visiveis.map((t) => {
              const p = PRIORIDADES[t.prioridade];
              return (
                <li
                  key={t.id}
                  className={`flex items-start gap-3 bg-white border border-neutral-200 border-l-4 ${p.bar} rounded-xl px-4 py-3.5 ${
                    t.concluida ? "opacity-55" : ""
                  }`}
                >
                  <button
                    onClick={() => alternarConcluida(t.id)}
                    aria-label="Marcar como concluída"
                    className={`w-5.5 h-5.5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                      t.concluida
                        ? "bg-emerald-800 border-emerald-800 text-white"
                        : "border-neutral-300 text-transparent"
                    }`}
                    style={{ width: 22, height: 22 }}
                  >
                    <Check size={13} />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-[0.98rem] ${t.concluida ? "line-through" : ""}`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {t.titulo}
                    </p>
                    {t.descricao && (
                      <p className="text-sm text-neutral-500 mt-0.5">{t.descricao}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${p.badge}`}>
                        {p.label}
                      </span>
                      {t.prazo && (
                        <span className="text-xs text-neutral-500 bg-[#F5F6F2] border border-neutral-200 px-2.5 py-0.5 rounded-full">
                          {formatarData(t.prazo)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => setTarefaEditando({ ...t })}
                      aria-label="Editar"
                      className="text-neutral-400 hover:text-emerald-800 p-1"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => excluirTarefa(t.id)}
                      aria-label="Excluir"
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Modal de edição */}
      {tarefaEditando && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50"
          onClick={(e) => e.target === e.currentTarget && setTarefaEditando(null)}
        >
          <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Editar tarefa
              </h3>
              <button onClick={() => setTarefaEditando(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={salvarEdicao}>
              <label className="block text-sm font-semibold text-neutral-500 mb-1.5">Título</label>
              <input
                type="text"
                required
                value={tarefaEditando.titulo}
                onChange={(e) => setTarefaEditando({ ...tarefaEditando, titulo: e.target.value })}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-emerald-700"
              />

              <label className="block text-sm font-semibold text-neutral-500 mb-1.5">Descrição</label>
              <textarea
                rows={3}
                value={tarefaEditando.descricao}
                onChange={(e) => setTarefaEditando({ ...tarefaEditando, descricao: e.target.value })}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-emerald-700 resize-y"
              />

              <div className="flex gap-3 mb-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-neutral-500 mb-1.5">Prioridade</label>
                  <select
                    value={tarefaEditando.prioridade}
                    onChange={(e) => setTarefaEditando({ ...tarefaEditando, prioridade: e.target.value })}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-700"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-neutral-500 mb-1.5">Prazo</label>
                  <input
                    type="date"
                    value={tarefaEditando.prazo}
                    onChange={(e) => setTarefaEditando({ ...tarefaEditando, prazo: e.target.value })}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setTarefaEditando(null)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-800 text-white hover:brightness-110"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
