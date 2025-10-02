import Papa from 'papaparse';
import type { Fila } from '@/components/LotesTable';

export function getCsvUrl(): string {
  const fromParam = new URLSearchParams(window.location.search).get('csv');
  const env = import.meta.env.VITE_CSV_URL as string | undefined;
  return fromParam || env || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRaI7sOAiRly63-KKilxVEY90koUG-6y7gvbUpl6HQhMfBTGbv7DCr7ebPPH-cri22uy5mcq2V4ATL4/pub?gid=0&single=true&output=csv';
}

function normHeader(h: string): string {
  return (h ?? '')
    .replace(/\uFEFF/g, '')
    .replace(/\u00A0/g, ' ')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[º°]/g, 'o')
    .replace(/[^a-z0-9\s()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const HEADER_MAP: Record<string, keyof Fila> = {
  'zona': 'Zona',
  'razon social': 'Razón Social',
  'lotes': 'Lotes',
  'superficie ha': 'Superficie (ha)',
  'superficie (ha)': 'Superficie (ha)',
  'superficie': 'Superficie (ha)',
  'kmz': 'KMZ',
  'hist cultivos': 'Hist. Cultivos',
  'hist. cultivos': 'Hist. Cultivos',
  'no pasadas': 'N° Pasadas',
  'n pasadas': 'N° Pasadas',
  'n o pasadas': 'N° Pasadas',
  'nro pasadas': 'N° Pasadas',
  'n aplicac': 'N° Aplicac.',
  'no aplicac': 'N° Aplicac.',
  'n aplicac.': 'N° Aplicac.',
  'n o aplicac': 'N° Aplicac.',
  'nro aplicac': 'N° Aplicac.',
  'foto refugio': 'Foto Refugio',
  'dss': 'DSS',
  'analisis suelo': 'Análisis Suelo',
  'analisis de suelo': 'Análisis Suelo',
  'analisis  suelo': 'Análisis Suelo',
  'avance': 'Avance',
  'avance %': 'Avance',
  '% avance': 'Avance',
};

function canonicalizeRow(raw: any, warnOnce: Set<string>) {
  const out: Partial<Fila> = {};
  const unknown: string[] = [];
  for (const key of Object.keys(raw)) {
    const n = normHeader(String(key));
    const mapped = HEADER_MAP[n];
    if (mapped) (out as any)[mapped] = raw[key];
    else unknown.push(key);
  }
  if (unknown.length && !warnOnce.has('headers')) {
    console.warn('Encabezados no mapeados:', unknown);
    warnOnce.add('headers');
  }
  return out;
}

export async function fetchCsvText(url: string): Promise<string> {
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.text();
  } catch {
    const proxy = 'https://cors.isomorphic-git.org/';
    const r2 = await fetch(proxy + url, { cache: 'no-store' });
    if (!r2.ok) throw new Error('HTTP ' + r2.status);
    return await r2.text();
  }
}

function toNumber(x: any): number | undefined {
  if (x == null) return undefined;
  const s = String(x).replace(/%/g, '').replace(/\./g, '').replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

function normalizeBool(x: any): string {
  const s = String(x ?? '').trim().toLowerCase();
  return ['si','sí','yes','true','1','ok','x'].includes(s) ? 'Sí' : 'No';
}

export function parseRows(csvText: string): Fila[] {
  const res = Papa.parse(csvText, { header: true, dynamicTyping: false, skipEmptyLines: true });
  const rows: Fila[] = [];
  const warnOnce = new Set<string>();

  for (const row of res.data as any[]) {
    if (!row) continue;
    const raw = canonicalizeRow(row, warnOnce);

    const avance = toNumber((raw as any)['Avance']);
    const sup = toNumber((raw as any)['Superficie (ha)']);

    rows.push({
      Zona: (raw as any)['Zona'] ?? '',
      'Razón Social': (raw as any)['Razón Social'] ?? '',
      Lotes: (raw as any)['Lotes'] ?? '',
      'Superficie (ha)': sup ?? 0,
      KMZ: normalizeBool((raw as any)['KMZ']),
      'Hist. Cultivos': normalizeBool((raw as any)['Hist. Cultivos']),
      'N° Pasadas': normalizeBool((raw as any)['N° Pasadas']),
      'N° Aplicac.': normalizeBool((raw as any)['N° Aplicac.']),
      'Foto Refugio': normalizeBool((raw as any)['Foto Refugio']),
      DSS: normalizeBool((raw as any)['DSS']),
      'Análisis Suelo': normalizeBool((raw as any)['Análisis Suelo']),
      Avance: avance ?? 0,
    });
  }
  return rows;
}
