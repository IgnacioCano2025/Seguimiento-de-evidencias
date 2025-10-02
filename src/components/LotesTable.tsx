import BoolBadge from '@/components/BoolBadge'; import Chip from '@/components/Chip'; import ProgressChip from '@/components/ProgressChip'; import { fmtHa } from '@/lib/ui';
export type Fila = { Zona:string; 'Razón Social':string; Lotes:string; 'Superficie (ha)':number; KMZ:string|boolean; 'Hist. Cultivos':string|boolean; 'N° Pasadas':string|boolean; 'N° Aplicac.':string|boolean; 'Foto Refugio':string|boolean; DSS:string|boolean; 'Análisis Suelo':string|boolean; Avance:number; };
export default function LotesTable({ rows }:{ rows:Fila[] }){
  return (<div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="sticky top-0 z-10 bg-gray-50">
        <tr className="[&>th]:px-3 [&>th]:py-2.5 [&>th]:text-left [&>th]:text-xs [&>th]:font-semibold [&>th]:uppercase [&>th]:tracking-wide [&>th]:text-gray-600">
          <th>Zona</th><th>Razón Social</th><th>Lotes</th><th className="text-right">Superficie (ha)</th><th>KMZ</th><th>Hist. Cultivos</th><th>N° Pasadas</th><th>N° Aplicac.</th><th>Foto Refugio</th><th>DSS</th><th>Análisis Suelo</th><th>Avance</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {rows.map((r,i)=>(
          <tr key={i} className="even:bg-gray-50 hover:bg-gray-50 transition-colors">
            <td className="px-3 py-3"><Chip tone="sky">{r.Zona}</Chip></td>
            <td className="px-3 py-3 font-medium text-gray-900">{r['Razón Social']}</td>
            <td className="px-3 py-3 text-gray-700">{r.Lotes}</td>
            <td className="px-3 py-3 text-right tabular-nums">{fmtHa(r['Superficie (ha)'])}</td>
            <td className="px-3 py-3"><BoolBadge value={r.KMZ} /></td>
            <td className="px-3 py-3"><BoolBadge value={r['Hist. Cultivos']} /></td>
            <td className="px-3 py-3"><BoolBadge value={r['N° Pasadas']} /></td>
            <td className="px-3 py-3"><BoolBadge value={r['N° Aplicac.']} /></td>
            <td className="px-3 py-3"><BoolBadge value={r['Foto Refugio']} /></td>
            <td className="px-3 py-3"><BoolBadge value={r.DSS} /></td>
            <td className="px-3 py-3"><BoolBadge value={r['Análisis Suelo']} /></td>
            <td className="px-3 py-3"><ProgressChip value={r.Avance} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>);
}
