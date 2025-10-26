import { useEffect, useState } from "react";
import {
  getInvitados,
  createInvitado,
  updateInvitado,
  deleteInvitado,
} from "../lib/supabaseClient";
import type { Invitado } from "../lib/supabaseClient";
import {
  Pencil,
  Trash2,
  Send,
  Copy,
  ExternalLink,
  BarChart3,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Invitado>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<Invitado | null>(null);
  const [mesasVisibles, setMesasVisibles] = useState<number[]>([]);

  const fetchInvitados = async () => {
    setLoading(true);
    const data = await getInvitados();
    if (data) setInvitados(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvitados();
  }, []);

  const mesasUnicas = [...new Set(invitados.map((i) => i.mesa))].sort(
    (a, b) => a - b
  );

  useEffect(() => {
    if (mesasVisibles.length === 0) setMesasVisibles(mesasUnicas);
  }, [invitados]);

  const handleCheckboxChange = (mesa: number) => {
    setMesasVisibles((prev) =>
      prev.includes(mesa) ? prev.filter((m) => m !== mesa) : [...prev, mesa]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarCodigoUnico = (): string => {
    const codigosExistentes = new Set(invitados.map((i) => i.codigo));
    let codigo = "";
    do {
      codigo = Array.from(crypto.getRandomValues(new Uint8Array(4)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } while (codigosExistentes.has(codigo));
    return codigo;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codigo =
      form.codigo && form.codigo.trim() !== ""
        ? form.codigo
        : generarCodigoUnico();

    if (editingId) {
      await updateInvitado(editingId, { ...form, codigo });
    } else {
      const { id, created_at, updated_at, ...rest } = form;
      const cleanData = {
        ...rest,
        codigo,
        mesa: Number(rest.mesa) || 0,
        adultos: Number(rest.adultos) || 0,
        niños: Number(rest.niños) || 0,
      };
      await createInvitado(cleanData as any);
    }
    setShowModal(false);
    setEditingId(null);
    setForm({});
    fetchInvitados();
  };

  const handleEdit = (invitado: Invitado) => {
    setForm(invitado);
    setEditingId(invitado.id);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deleteInvitado(id);
    setShowDeleteModal(null);
    fetchInvitados();
  };

  const totalInvitados = invitados.length;
  const totalAdultos = invitados.reduce((acc, i) => acc + (i.adultos || 0), 0);
  const totalNinos = invitados.reduce((acc, i) => acc + (i.niños || 0), 0);
  const totalMesas = mesasUnicas.length;

  const copiarLink = (codigo: string) => {
    const link = `https://invitacion-xv-andy-ms.vercel.app/?c=${codigo}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado al portapapeles ✅");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-100 text-black font-sans uppercase tracking-wider">
      {/* ASIDE */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-72 bg-gray-100 border-r border-slate-700 z-40 transform transition-transform duration-300 ${
          showStats ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Panel</h2>
          <button
            className="md:hidden text-slate-700"
            onClick={() => setShowStats(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cards estadísticas */}
        <div className="grid grid-cols-2 gap-px bg-slate-700 border-b border-slate-700">
          {[
            { label: "Invitados", value: totalInvitados },
            { label: "Adultos", value: totalAdultos },
            { label: "Niños", value: totalNinos },
            { label: "Mesas", value: totalMesas },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-neutral-100 p-4 border border-slate-700 text-center"
            >
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="p-4 border-b border-slate-700">
          <p className="font-semibold mb-2">Filtrar mesas:</p>
          <div className="flex flex-wrap gap-2">
            {mesasUnicas.map((mesa) => (
              <label
                key={mesa}
                className={`px-3 py-2 border border-slate-700 text-sm cursor-pointer ${
                  mesasVisibles.includes(mesa)
                    ? "bg-slate-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={mesasVisibles.includes(mesa)}
                  onChange={() => handleCheckboxChange(mesa)}
                />
                Mesa {mesa}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 border-t md:border-t-0 md:border-l border-slate-700">
        {/* Header */}
        <header className="border-b border-slate-700 pb-3 mb-4 flex flex-col sm:flex-row justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-widest text-center sm:text-left">
            Dashboard
          </h1>
          <button
            onClick={() => {
              setForm({});
              setEditingId(null);
              setShowModal(true);
            }}
            className="px-5 py-3 text-sm sm:text-base border border-slate-700 bg-gray-200 hover:bg-slate-700 hover:text-white transition w-full sm:w-auto"
          >
            + Nuevo Invitado
          </button>
        </header>

        {/* Grid Mesas */}
        {loading ? (
          <p className="text-gray-600 text-center mt-10">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {mesasUnicas
              .filter((m) => mesasVisibles.includes(m))
              .map((mesaNum) => {
                const mesaInv = invitados.filter((i) => i.mesa === mesaNum);
                return (
                  <div
                    key={mesaNum}
                    className="border border-slate-700 bg-gray-100 p-4 flex flex-col"
                  >
                    <div className="flex items-center justify-center md:justify-center border-b border-slate-700 mb-3 pb-1">
                      <h2 className="font-semibold text-center flex-1">MESA {mesaNum}</h2>
                      <button
                        type="button"
                        className="md:hidden ml-2 px-3 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-800 border border-slate-700"
                        onClick={() => {
                          setForm({ mesa: mesaNum, adultos: 1, niños: 0 });
                          setEditingId(null);
                          setShowModal(true);
                        }}
                        aria-label={`Agregar invitado a mesa ${mesaNum}`}
                      >
                        + Nuevo
                      </button>
                    </div>

                    {/* Responsive: tabla en PC, tarjetas en mobile */}
                    <div className="hidden md:block">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-700 text-left">
                            <th className="py-1">Nombre</th>
                            <th className="py-1">Código</th>
                            <th className="py-1 text-center">Adultos</th>
                            <th className="py-1 text-center">Niños</th>
                            <th className="py-1 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mesaInv.map((inv) => {
                            const link = `https://invitacion-xv-andy-ms.vercel.app/?c=${inv.codigo}`;
                            return (
                              <tr key={inv.id} className="border-b border-slate-700 hover:bg-gray-200">
                                <td className="py-1">{inv.nombre}</td>
                                <td className="py-1">{inv.codigo}</td>
                                <td className="py-1 text-center">{inv.adultos}</td>
                                <td className="py-1 text-center">{inv.niños}</td>
                                <td className="py-1 text-center">
                                  <div className="grid grid-cols-2 gap-2 justify-center">
                                    <button onClick={() => handleEdit(inv)} className="px-4 py-3 bg-purple-200 hover:bg-purple-300 text-lg rounded"><Pencil size={22} /></button>
                                    <button onClick={() => setShowDeleteModal(inv)} className="px-4 py-3 bg-red-200 hover:bg-red-300 text-lg rounded"><Trash2 size={22} /></button>
                                    <button onClick={() => window.open(link, '_blank')} className="px-4 py-3 bg-blue-200 hover:bg-blue-300 text-lg rounded"><ExternalLink size={22} /></button>
                                    <button onClick={() => copiarLink(inv.codigo)} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-lg rounded"><Copy size={22} /></button>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-green-200 hover:bg-green-300 text-lg rounded"><Send size={22} /></a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-col gap-3 md:hidden">
                      {mesaInv.map((inv) => {
                        const link = `https://invitacion-xv-andy-ms.vercel.app/?c=${inv.codigo}`;
                        return (
                          <div key={inv.id} className="border border-slate-700 bg-white p-3 text-sm flex flex-col gap-2">
                            <p><span className="font-semibold">Nombre:</span> {inv.nombre}</p>
                            <p><span className="font-semibold">Código:</span> {inv.codigo}</p>
                            <p><span className="font-semibold">Adultos:</span> {inv.adultos}</p>
                            <p><span className="font-semibold">Niños:</span> {inv.niños}</p>
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
                              <button onClick={() => handleEdit(inv)} className="w-full px-3 py-3 bg-purple-200 hover:bg-purple-300 text-lg rounded"><Pencil size={22} /></button>
                              <button onClick={() => setShowDeleteModal(inv)} className="w-full px-3 py-3 bg-red-200 hover:bg-red-300 text-lg rounded"><Trash2 size={22} /></button>
                              <button onClick={() => window.open(link, '_blank')} className="w-full px-3 py-3 bg-blue-200 hover:bg-blue-300 text-lg rounded"><ExternalLink size={22} /></button>
                              <button onClick={() => copiarLink(inv.codigo)} className="w-full px-3 py-3 bg-gray-200 hover:bg-gray-300 text-lg rounded"><Copy size={22} /></button>
                              <a href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" className="w-full px-3 py-3 bg-green-200 hover:bg-green-300 text-lg rounded"><Send size={22} /></a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </main>

      {/* Botón flotante móvil */}
      <button
        onClick={() => setShowStats(true)}
        className="md:hidden fixed bottom-6 right-6 p-4 border border-slate-700 bg-gray-200 hover:bg-slate-700 hover:text-white rounded-none"
      >
        <BarChart3 size={24} />
      </button>

      {/* Modal Crear / Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 border border-slate-700 p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b border-slate-700 mb-4 pb-2">
              <h2 className="text-lg font-bold">
                {editingId ? "EDITAR INVITADO" : "NUEVO INVITADO"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="font-semibold text-xs mb-1">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="NOMBRE"
                  value={form.nombre || ""}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-700 px-4 py-3 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mesa" className="font-semibold text-xs mb-1">Mesa</label>
                <input
                  id="mesa"
                  name="mesa"
                  type="number"
                  placeholder="MESA"
                  value={form.mesa !== undefined ? form.mesa : 1}
                  min={1}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-700 px-4 py-3 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="adultos" className="font-semibold text-xs mb-1">Adultos</label>
                <input
                  id="adultos"
                  name="adultos"
                  type="number"
                  placeholder="ADULTOS"
                  value={form.adultos !== undefined ? form.adultos : 1}
                  min={0}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-700 px-4 py-3 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="niños" className="font-semibold text-xs mb-1">Niños</label>
                <input
                  id="niños"
                  name="niños"
                  type="number"
                  placeholder="NIÑOS"
                  value={form.niños !== undefined ? form.niños : 0}
                  min={0}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-700 px-4 py-3 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-700 bg-gray-200 hover:bg-slate-700 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-slate-700 bg-gray-200 hover:bg-slate-700 hover:text-white"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 border border-slate-700 p-6 w-full max-w-sm text-center">
            <p className="text-sm mb-4">
              ¿Eliminar a <strong>{showDeleteModal.nombre}</strong>?
            </p>
            <div className="flex justify-center gap-2 border-t border-slate-700 pt-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 border border-slate-700 bg-gray-200 hover:bg-slate-700 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal.id)}
                className="px-4 py-2 border border-slate-700 bg-red-200 hover:bg-red-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
