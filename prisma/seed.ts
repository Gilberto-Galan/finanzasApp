import path from 'path'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
const { PrismaClient } = require('@prisma/client')

const dbPath = path.join(__dirname, 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` })
const prisma = new PrismaClient({ adapter })

async function main() {
  const expenseCategories = [
    { name: 'Alimentación',    icon: 'utensils',      color: '#f97316', type: 'expense' },
    { name: 'Transporte',      icon: 'car',           color: '#3b82f6', type: 'expense' },
    { name: 'Renta',           icon: 'home',          color: '#8b5cf6', type: 'expense' },
    { name: 'Salud',           icon: 'heart-pulse',   color: '#ef4444', type: 'expense' },
    { name: 'Entretenimiento', icon: 'tv',            color: '#ec4899', type: 'expense' },
    { name: 'Ropa',            icon: 'shirt',         color: '#14b8a6', type: 'expense' },
    { name: 'Educación',       icon: 'book-open',     color: '#f59e0b', type: 'expense' },
    { name: 'Servicios',       icon: 'zap',           color: '#6366f1', type: 'expense' },
  ]

  const incomeCategories = [
    { name: 'Sueldo',      icon: 'briefcase',   color: '#22c55e', type: 'income' },
    { name: 'Freelance',   icon: 'laptop',      color: '#10b981', type: 'income' },
    { name: 'Inversiones', icon: 'trending-up', color: '#06b6d4', type: 'income' },
    { name: 'Otros',       icon: 'plus-circle', color: '#84cc16', type: 'income' },
  ]

  for (const cat of [...expenseCategories, ...incomeCategories]) {
    await prisma.category.upsert({
      where: { id: cat.name },
      update: {},
      create: cat,
    })
  }

  await prisma.account.upsert({
    where: { id: 'cuenta-principal' },
    update: {},
    create: {
      id:       'cuenta-principal',
      name:     'Cuenta Principal',
      type:     'checking',
      balance:  10000,
      currency: 'MXN',
      color:    '#6366f1',
    },
  })

  console.log('✅ Datos iniciales creados correctamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })