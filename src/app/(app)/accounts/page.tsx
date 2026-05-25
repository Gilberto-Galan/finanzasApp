import { Wallet, CreditCard, Banknote, PiggyBank } from 'lucide-react'
import NewAccountButton from '@/components/NewAccountButton'

async function getAccounts() {
  const res = await fetch('http://localhost:3000/api/accounts', {
    cache: 'no-store',
  })
  return res.json()
}

const typeConfig: Record<string, { label: string; icon: any; color: string }> = {
  checking: { label: 'Cuenta de cheques', icon: Wallet,     color: 'text-indigo-400 bg-indigo-500/20' },
  savings:  { label: 'Ahorros',           icon: PiggyBank,  color: 'text-green-400  bg-green-500/20'  },
  cash:     { label: 'Efectivo',          icon: Banknote,   color: 'text-yellow-400 bg-yellow-500/20' },
  credit:   { label: 'Crédito',           icon: CreditCard, color: 'text-red-400    bg-red-500/20'    },
}

function formatMXN(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style:    'currency',
    currency: 'MXN',
  }).format(amount)
}

export default async function AccountsPage() {
  const accounts = await getAccounts()

  const totalBalance = accounts.reduce(
    (sum: number, a: any) => sum + a.balance, 0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cuentas</h1>
          <p className="text-slate-400 mt-1">Administra tus cuentas y saldos</p>
        </div>
        <NewAccountButton />
      </div>

      {/* Balance total */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-6">
        <p className="text-sm text-slate-400">Balance Total</p>
        <p className="text-4xl font-bold text-white mt-1">{formatMXN(totalBalance)}</p>
        <p className="text-sm text-slate-500 mt-1">{accounts.length} cuenta(s) registrada(s)</p>
      </div>

      {/* Lista de cuentas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {accounts.map((account: any) => {
          const config = typeConfig[account.type] ?? typeConfig.checking
          const Icon   = config.icon
          return (
            <div
              key={account.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
                  {config.label}
                </span>
              </div>
              <p className="text-sm text-slate-400">{account.name}</p>
              <p className="text-2xl font-bold text-white mt-1">
                {formatMXN(account.balance)}
              </p>
              <p className="text-xs text-slate-500 mt-3">
                {account._count?.transactions ?? 0} transacciones
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}