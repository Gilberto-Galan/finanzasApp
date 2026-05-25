'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Category {
  id:   string
  name: string
  type: string
}

interface Account {
  id:   string
  name: string
}

export default function NewTransactionButton({
  categories,
  accounts,
}: {
  categories: Category[]
  accounts:   Account[]
}) {
  const [open, setOpen]       = useState(false)
  const [type, setType]       = useState<'income' | 'expense'>('expense')
  const [loading, setLoading] = useState(false)
  const router                = useRouter()

  const filtered = categories.filter((c) => c.type === type)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const body = {
      amount:      parseFloat(form.get('amount') as string),
      description: form.get('description') as string,
      type,
      date:        form.get('date') as string,
      accountId:   form.get('accountId') as string,
      categoryId:  form.get('categoryId') as string || undefined,
      notes:       form.get('notes') as string || undefined,
    }

    await fetch('/api/transactions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })

    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Nueva Transacción
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Nueva Transacción</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo */}
              <div className="flex rounded-lg overflow-hidden border border-slate-700">
                {(['expense', 'income'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors
                      ${type === t
                        ? t === 'expense'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-green-500/20 text-green-400'
                        : 'text-slate-400 hover:bg-slate-800'
                      }`}
                  >
                    {t === 'expense' ? 'Gasto' : 'Ingreso'}
                  </button>
                ))}
              </div>

              {/* Monto */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Monto (MXN)</label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Descripción</label>
                <input
                  name="description"
                  type="text"
                  required
                  placeholder="Ej. Supermercado"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Fecha</label>
                <input
                  name="date"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Cuenta */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Cuenta</label>
                <select
                  name="accountId"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              {/* Categoría */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Categoría</label>
                <select
                  name="categoryId"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Sin categoría</option>
                  {filtered.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Notas */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Notas (opcional)</label>
                <input
                  name="notes"
                  type="text"
                  placeholder="Notas adicionales..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Transacción'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}