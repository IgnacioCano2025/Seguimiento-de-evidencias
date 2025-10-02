export type Tone = 'gray'|'sky'|'emerald'|'rose'|'red'|'orange'|'amber'|'lime'|'green';
export const toneClasses = (tone: Tone = 'gray') => [
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1','transition-colors',{
    gray:'bg-gray-50 text-gray-700 ring-gray-200',
    sky:'bg-sky-50 text-sky-700 ring-sky-200',
    emerald:'bg-emerald-50 text-emerald-700 ring-emerald-200',
    rose:'bg-rose-50 text-rose-700 ring-rose-200',
    red:'bg-red-50 text-red-700 ring-red-200',
    orange:'bg-orange-50 text-orange-700 ring-orange-200',
    amber:'bg-amber-50 text-amber-700 ring-amber-200',
    lime:'bg-lime-50 text-lime-700 ring-lime-200',
    green:'bg-green-50 text-green-700 ring-green-200',
  }[tone],
].join(' ');
export const asBool = (v: unknown) => ['si','sí','yes','true','1','ok','x'].includes(String(v ?? '').trim().toLowerCase());
export const fmtHa = (n?: number) => typeof n === 'number' ? (n/100).toLocaleString('es-AR') : '';
export const progressTone = (p?: number): Tone => { if (p == null || Number.isNaN(p)) return 'gray'; if (p < 20) return 'red'; if (p < 40) return 'orange'; if (p < 60) return 'amber'; if (p < 80) return 'lime'; return 'green'; };
