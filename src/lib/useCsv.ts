import { useEffect, useMemo, useState } from 'react';
import { fetchCsvText, getCsvUrl, parseRows } from '@/lib/csv';
import type { Fila } from '@/components/LotesTable';

export function useCsvData(refreshMs = 10000) {
  const url = useMemo(() => getCsvUrl(), []);
  const [rows, setRows] = useState<Fila[]>([]);
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [ts, setTs] = useState<number | null>(null);

  async function load() {
    try {
      setStatus('loading');
      const text = await fetchCsvText(url);
      const parsed = parseRows(text);
      setRows(parsed);
      setStatus('ok');
      setError(null);
      setTs(Date.now());
    } catch (e:any) {
      setStatus('error');
      setError(e?.message || 'Error');
    }
  }

  useEffect(() => {
    load();
    if (refreshMs > 0) {
      const id = setInterval(load, refreshMs);
      return () => clearInterval(id);
    }
  }, [url, refreshMs]);

  return { url, rows, status, error, ts, reload: load };
}

export function useSearch(rows: Fila[]) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(r =>
      (r.Zona ?? '').toLowerCase().includes(s) ||
      (r['Razón Social'] ?? '').toLowerCase().includes(s) ||
      (r.Lotes ?? '').toLowerCase().includes(s)
    );
  }, [rows, q]);
  return { q, setQ, filtered };
}

export function calcKPIs(rows: Fila[]) {
  const totalHa = rows.reduce((acc, r) => acc + (r['Superficie (ha)'] || 0), 0);
  const productores = new Set(rows.map(r => r['Razón Social'])).size;
  const lotes = rows.length;
  const zonas = new Set(rows.map(r => r.Zona)).size;
  return { totalHa, productores, lotes, zonas };
}

export function groupByZona(rows: Fila[]) {
  const by: Record<string, { zona:string, hectareas:number, productores:Set<string>, lotes:number }> = {};
  for (const r of rows) {
    const z = r.Zona || '—';
    if (!by[z]) by[z] = { zona: z, hectareas: 0, productores: new Set(), lotes: 0 };
    by[z].hectareas += r['Superficie (ha)'] || 0;
    by[z].productores.add(r['Razón Social']);
    by[z].lotes += 1;
  }
  return Object.values(by).map(x => ({
    zona: x.zona,
    hectareas: x.hectareas,
    productores: x.productores.size,
    lotes: x.lotes,
  }));
}
