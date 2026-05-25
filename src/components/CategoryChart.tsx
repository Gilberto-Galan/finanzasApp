'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface Category {
  name:   string
  color:  string
  amount: number
}

const FALLBACK = [
  { name: 'Sin datos', color: '#334155', amount: 1 },
]

export default function CategoryChart({ data }: { data: Category[] }) {
  const chartData = data.length > 0 ? data : FALLBACK

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 h-full">
      <h2 className="text-base font-semibold text-white mb-6">
        Gastos por Categoría
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="amount"
            paddingAngle={3}
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            formatter={(value: number) => [`$${value.toLocaleString('es-MX')}`, undefined]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Leyenda */}
      <div className="mt-4 space-y-2">
        {chartData.map((cat, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-slate-400">{cat.name}</span>
            </div>
            <span className="text-white font-medium">
              ${cat.amount.toLocaleString('es-MX')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}