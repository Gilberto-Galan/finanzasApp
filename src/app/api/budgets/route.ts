import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const budgetSchema = z.object({
  name:       z.string().min(1),
  amount:     z.number().positive(),
  period:     z.enum(['weekly', 'monthly', 'yearly']),
  categoryId: z.string().optional(),
  startDate:  z.string(),
  endDate:    z.string(),
})

export async function GET() {
  const budgets = await prisma.budget.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(budgets)
}

export async function POST(req: Request) {
  const body = await req.json()
  const data = budgetSchema.parse(body)

  const budget = await prisma.budget.create({
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate:   new Date(data.endDate),
    },
  })
  return NextResponse.json(budget, { status: 201 })
}