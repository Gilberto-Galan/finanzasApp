import TransactionList from '@/components/TransactionList'
import NewTransactionButton from '@/components/NewTransactionButton'

async function getTransactions() {
  const res = await fetch('http://localhost:3000/api/transactions?limit=100', {
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

async function getAccounts() {
  const res = await fetch('http://localhost:3000/api/accounts', {
    cache: 'no-store',
  })
  return res.json()
}

export default async function TransactionsPage() {
  const [transactions, categories, accounts] = await Promise.all([
    getTransactions(),
    getCategories(),
    getAccounts(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transacciones</h1>
          <p className="text-slate-400 mt-1">Historial de ingresos y gastos</p>
        </div>
        <NewTransactionButton categories={categories} accounts={accounts} />
      </div>

      <TransactionList transactions={transactions} />
    </div>
  )
}