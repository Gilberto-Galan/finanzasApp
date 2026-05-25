import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react'
import StatCard from '@/components/StatCard'
import ExpenseChart from '@/components/ExpenseChart'
import CategoryChart from '@/components/CategoryChart'
import RecentTransactions from '@/components/RecentTransactions'

async function getSummary() {
  const res = await fetch('http://localhost:3000/api/summary', {
    cache: 'no-store',
  })
  return res.json()
}

async function getTransactions() {
  const res = await fetch('http://localhost:3000/api/transactions?limit=5', {
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

export default async function DashboardPage() {
  const [summary, transactions] = await Promise.all([
    getSummary(),
    getTransactions(),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Resumen financiero del mes actual
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Balance Total"
          value={formatMXN(summary.totalBalance ?? 0)}
          subtitle="Todas las cuentas"
          icon={Wallet}
          color="indigo"
        />
        <StatCard
          title="Ingresos del Mes"
          value={formatMXN(summary.income ?? 0)}
          subtitle="Este mes"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Gastos del Mes"
          value={formatMXN(summary.expense ?? 0)}
          subtitle="Este mes"
          icon={TrendingDown}
          color="red"
        />
        <StatCard
          title="Ahorro del Mes"
          value={formatMXN(summary.savings ?? 0)}
          subtitle="Ingresos - Gastos"
          icon={PiggyBank}
          color="blue"
        />
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ExpenseChart />
        </div>
        <div>
          <CategoryChart data={summary.topCategories ?? []} />
        </div>
      </div>

      {/* Transacciones recientes */}
      <RecentTransactions transactions={transactions} />
    </div>
  )
}