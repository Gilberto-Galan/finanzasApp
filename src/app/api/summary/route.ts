import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const now       = new Date()
  const firstDay  = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay   = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const [accounts, transactions, categoryTotals] = await Promise.all([
    // Saldo total de todas las cuentas
    prisma.account.findMany({
      select: { id: true, name: true, balance: true, color: true, type: true },
    }),

    // Ingresos y gastos del mes actual
    prisma.transaction.groupBy({
      by: ['type'],
      where: { date: { gte: firstDay, lte: lastDay } },
      _sum: { amount: true },
    }),

    // Gastos por categoría este mes
    prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        type: 'expense',
        date: { gte: firstDay, lte: lastDay },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 5,
    }),
  ])

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)
  const income  = transactions.find(t => t.type === 'income')?._sum.amount  ?? 0
  const expense = transactions.find(t => t.type === 'expense')?._sum.amount ?? 0

  // Enriquecer categorías con nombre
  const enrichedCategories = await Promise.all(
    categoryTotals.map(async (ct) => {
      if (!ct.categoryId) return null
      const category = await prisma.category.findUnique({
        where: { id: ct.categoryId },
        select: { name: true, color: true, icon: true },
      })
      return { ...category, amount: ct._sum.amount ?? 0 }
    })
  )

  return NextResponse.json({
    totalBalance,
    income,
    expense,
    savings: income - expense,
    accounts,
    topCategories: enrichedCategories.filter(Boolean),
  })
}