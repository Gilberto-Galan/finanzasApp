'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewAccountButton() {
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const router                = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const body = {
      name:     form.get('name') as string,
      type:     form.get('type') as string,
      balance:  parseFloat(form.get('balance') as string) || 0,
      currency: 'MXN',
      color:    form.get('color') as string,
    }

    await fetch('/api/accounts', {
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
        Nueva Cuenta
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Nueva Cuenta</h2>
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
                  placeholder="Ej. BBVA Nómina"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Tipo</label>
                <select
                  name="type"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="checking">Cuenta de cheques</option>
                  <option value="savings">Ahorros</option>
                  <option value="cash">Efectivo</option>
                  <option value="credit">Crédito</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Saldo inicial (MXN)</label>
                <input
                  name="balance"
                  type="number"
                  step="0.01"
                  defaultValue="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {['#6366f1','#22c55e','#ef4444','#f59e0b','#3b82f6','#ec4899','#14b8a6'].map((c) => (
                    <label key={c} className="cursor-pointer">
                      <input type="radio" name="color" value={c} className="sr-only" defaultChecked={c === '#6366f1'} />
                      <div className="w-7 h-7 rounded-full border-2 border-transparent hover:border-white transition-colors"
                        style={{ backgroundColor: c }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {loading ? 'Guardando...' : 'Crear Cuenta'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}