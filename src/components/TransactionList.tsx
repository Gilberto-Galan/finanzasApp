'use client'

import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Transaction {
  id:          string
  amount:      number
  description: string
  type:        string
  date:        string
  category?:   { name: string; color: string }
  account:     { name: string; color: string }
}

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState<'all' | 'income' | 'expense'>('all')

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || tx.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900">
      {/* Filtros */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar transacción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex rounded-lg overflow-hidden border border-slate-700">
          {(['all', 'income', 'expense'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-medium transition-colors
                ${filter === f
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:bg-slate-800'
                }`}
            >
              {f === 'all' ? 'Todos' : f === 'income' ? 'Ingresos' : 'Gastos'}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="divide-y divide-slate-800">
        {filtered.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-12">
            No se encontraron transacciones
          </p>
        ) : (
          filtered.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0
                  ${tx.type === 'income'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {tx.type === 'income'
                    ? <ArrowUpRight className="w-4 h-4" />
                    : <ArrowDownLeft className="w-4 h-4" />
                  }
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{tx.description}</p>
                  <p className="text-xs text-slate-500">
                    {tx.category?.name ?? 'Sin categoría'} · {tx.account.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold
                  ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('es-MX')}
                </p>
                <p className="text-xs text-slate-500">
                  {format(new Date(tx.date), 'dd MMM yyyy', { locale: es })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}