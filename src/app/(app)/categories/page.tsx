async function getCategories() {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'no-store',
  })
  return res.json()
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  const expenses = categories.filter((c: any) => c.type === 'expense')
  const incomes  = categories.filter((c: any) => c.type === 'income')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Categorías</h1>
        <p className="text-slate-400 mt-1">Categorías de ingresos y gastos</p>
      </div>

      {/* Gastos */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Gastos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {expenses.map((cat: any) => (
            <div
              key={cat.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
              >
                💸
              </div>
              <div>
                <p className="text-sm font-medium text-white">{cat.name}</p>
                <p className="text-xs text-slate-500">Gasto</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingresos */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Ingresos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {incomes.map((cat: any) => (
            <div
              key={cat.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
              >
                💰
              </div>
              <div>
                <p className="text-sm font-medium text-white">{cat.name}</p>
                <p className="text-xs text-slate-500">Ingreso</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}