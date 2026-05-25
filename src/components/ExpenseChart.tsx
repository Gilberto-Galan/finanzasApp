'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// Datos de ejemplo — luego los conectamos a la API
const data = [
  { mes: 'Ene', ingresos: 12000, gastos: 8000 },
  { mes: 'Feb', ingresos: 14000, gastos: 9500 },
  { mes: 'Mar', ingresos: 13000, gastos: 7800 },
  { mes: 'Abr', ingresos: 15000, gastos: 11000 },
  { mes: 'May', ingresos: 16000, gastos: 10500 },
  { mes: 'Jun', ingresos: 14500, gastos: 9000 },
]

export default function ExpenseChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-base font-semibold text-white mb-6">
        Ingresos vs Gastos
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="ingresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gastos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="mes" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9' }}
            formatter={(value: number) =>
              [`$${value.toLocaleString('es-MX')}`, undefined]
            }
          />
          <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
          <Area type="monotone" dataKey="ingresos" stroke="#22c55e" fill="url(#ingresos)" strokeWidth={2} />
          <Area type="monotone" dataKey="gastos"   stroke="#ef4444" fill="url(#gastos)"   strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}