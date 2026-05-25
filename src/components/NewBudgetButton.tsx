'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Category {
  id:   string
  name: string
  type: string
}

export default function NewBudgetButton({
  categories,
}: {
  categories: Category[]
}) {
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const router                = useRouter()

  const expenseCategories = categories.filter((c) => c.type === 'expense')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const body = {
      name:       form.get('name') as string,
      amount:     parseFloat(form.get('amount') as string),
      period:     form.get('period') as string,
      categoryId: form.get('categoryId') as string || undefined,
      startDate:  form.get('startDate') as string,
      endDate:    form.get('endDate') as string,
    }

    await fetch('/api/budgets', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })

    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  // Fechas por defecto: inicio y fin del mes actual
  const now       = new Date()
  const firstDay  = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const lastDay   = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Nuevo Presupuesto
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Nuevo Presupuesto</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Nombre</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ej. Comida del mes"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Límite (MXN)</label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Periodo</label>
                <select
                  name="period"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="monthly">Mensual</option>
                  <option value="weekly">Semanal</option>
                  <option value="yearly">Anual</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Categoría (opcional)</label>
                <select
                  name="categoryId"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">General</option>
                  {expenseCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Fecha inicio</label>
                  <input
                    name="startDate"
                    type="date"
                    required
                    defaultValue={firstDay}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Fecha fin</label>
                  <input
                    name="endDate"
                    type="date"
                    required
                    defaultValue={lastDay}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {loading ? 'Guardando...' : 'Crear Presupuesto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}