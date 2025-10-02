import LotesTable from '@/components/LotesTable';
import { HectareasPorZona, ProdYLotesPorZona } from '@/components/Charts';
import KPIs from '@/components/KPIs';
import { useCsvData, useSearch, calcKPIs, groupByZona } from '@/lib/useCsv';

export default function App() {
  const { url, rows, status, error, ts, reload } = useCsvData(10000);
  const { q, setQ, filtered } = useSearch(rows);
  const kpis = calcKPIs(filtered);
  const zonas = groupByZona(filtered);
  const hectareasData = zonas.map(z => ({ zona: z.zona, hectareas: z.hectareas }));

  return (
    <main className="flex flex-col mx-auto max-w-7xl p-6 space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className='flex justify-center items-center gap-3'>
          <img src='src\public\edra-icon.png' width='90px' height='auto' />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#203C89]">Tablero — Seguimiento de evidencias</h1>
          <p>Programa de Agricultura Regenerativa Mc Cain 2025-2026</p>
        </div>
          
        </div>

        <div className="text-sm text-gray-600">
          {status === 'loading' && <span>Cargando…</span>}
          {status === 'ok' && ts && <span>Actualizado: {new Date(ts).toLocaleTimeString()}</span>}
          {status === 'error' && <span className="text-rose-600">Error: {error}</span>}
          <button onClick={reload} className="ml-3 rounded-lg border px-3 py-1 hover:bg-gray-50">Recargar</button>
        </div>
      </header>

      <div className="flex items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por Zona / Razón Social / Lote…"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:outline-none"
        />
        <span className="text-xs text-gray-500">{filtered.length} filas</span>
      </div>

      <KPIs {...kpis} />

      <section className="grid gap-6 md:grid-cols-2">
        <HectareasPorZona data={hectareasData} />
        <ProdYLotesPorZona data={zonas} />
      </section>

      <LotesTable rows={filtered} />
      <img className='self-end' src='src\public\logo-edra.png' width='150px' height='auto' />
    </main>
  );
}
