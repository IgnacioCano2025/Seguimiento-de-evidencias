export default function KPIs({ totalHa, productores, lotes, zonas }: { totalHa:number; productores:number; lotes:number; zonas:number }) {
  const Card = ({ label, value }:{ label:string; value:string }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="mt-1 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card label="Total Hectáreas" value={(totalHa/100).toLocaleString('es-AR')} />
      <Card label="Total Productores" value={String(productores)} />
      <Card label="Total Lotes" value={String(lotes)} />
      <Card label="Zonas" value={String(zonas)} />
    </div>
  );
}
