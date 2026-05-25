import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Transaction {
  id:          string
  amount:      number
  description: string
  type:        string
  date:        string
  category?:   { name: string; color: string }
  account:     { name: string }
}

export default function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[]
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-base font-semibold text-white mb-6">
        Transacciones Recientes
      </h2>

      {transactions.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">
          No hay transacciones aún
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center
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
                  {tx.type === 'income' ? '+' : '-'}$
                  {tx.amount.toLocaleString('es-MX')}
                </p>
                <p className="text-xs text-slate-500">
                  {format(new Date(tx.date), 'dd MMM', { locale: es })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}