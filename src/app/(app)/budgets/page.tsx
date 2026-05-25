import NewBudgetButton from '@/components/NewBudgetButton'

async function getBudgets() {
  const res = await fetch('http://localhost:3000/api/budgets', {
    cache: 'no-store',
  })
  return res.json()
}

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'no-store',
  })
  return res.json()
}

function formatMXN(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style:    'currency',
    currency: 'MXN',
  }).format(amount)
}

const periodLabel: Record<string, string> = {
  weekly:  'Semanal',
  monthly: 'Mensual',
  yearly:  'Anual',
}

export default async function BudgetsPage() {
  const [budgets, categories] = await Promise.all([
    getBudgets(),
    getCategories(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Presupuestos</h1>
          <p className="text-slate-400 mt-1">Controla tus límites de gasto</p>
        </div>
        <NewBudgetButton categories={categories} />
      </div>

      {budgets.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
          <p className="text-slate-400">No tienes presupuestos creados</p>
          <p className="text-slate-600 text-sm mt-1">
            Crea uno para controlar tus gastos por categoría
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {budgets.map((budget: any) => {
            const pct     = Math.min((budget.spent / budget.amount) * 100, 100)
            const remaining = budget.amount - budget.spent
            const color   = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500'

            return (
              <div
                key={budget.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-white">{budget.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {periodLabel[budget.period]}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${pct >= 90
                      ? 'bg-red-500/20 text-red-400'
                      : pct >= 70
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {pct.toFixed(0)}%
                  </span>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full transition-all ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-slate-500 text-xs">Gastado</p>
                    <p className="text-white font-medium">{formatMXN(budget.spent)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs">Restante</p>
                    <p className={`font-medium ${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {formatMXN(remaining)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800">
                  <p className="text-xs text-slate-500">
                    Límite: {formatMXN(budget.amount)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}