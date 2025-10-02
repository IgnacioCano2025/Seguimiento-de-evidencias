import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export function HectareasPorZona({ data }: { data: { zona:string, hectareas:number }[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Distribución por zona — Hectáreas</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="zona" /><YAxis /><Tooltip /><Legend />
            <Bar dataKey="hectareas" name="Superficie (Ha)" fill='#203C89' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export function ProdYLotesPorZona({ data }: { data: { zona:string, productores:number, lotes:number }[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Distribución por zona — Productores y Lotes</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="zona" /><YAxis /><Tooltip /><Legend />
            <Bar dataKey="productores" name="Productores" fill='#203C89'/>
            <Bar dataKey="lotes" name="Lotes" fill='#0099CD' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
