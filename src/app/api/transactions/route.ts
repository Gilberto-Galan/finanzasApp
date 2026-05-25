import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const transactionSchema = z.object({
  amount:      z.number().positive(),
  description: z.string().min(1),
  type:        z.enum(['income', 'expense', 'transfer']),
  date:        z.string().optional(),
  accountId:   z.string(),
  categoryId:  z.string().optional(),
  notes:       z.string().optional(),
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const accountId  = searchParams.get('accountId')
  const type       = searchParams.get('type')
  const limit      = Number(searchParams.get('limit')) || 50

  const transactions = await prisma.transaction.findMany({
    where: {
      ...(accountId && { accountId }),
      ...(type && { type }),
    },
    include: {
      account:  { select: { name: true, color: true } },
      category: { select: { name: true, icon: true, color: true } },
    },
    orderBy: { date: 'desc' },
    take: limit,
  })
  return NextResponse.json(transactions)
}

export async function POST(req: Request) {
  const body = await req.json()
  const data = transactionSchema.parse(body)

  const transaction = await prisma.$transaction(async (tx) => {
    const created = await tx.transaction.create({
      data: {
        ...data,
        date: data.date ? new Date(data.date) : new Date(),
      },
      include: {
        account:  { select: { name: true, color: true } },
        category: { select: { name: true, icon: true, color: true } },
      },
    })

    // Actualizar el saldo de la cuenta
    const delta = data.type === 'income' ? data.amount : -data.amount
    await tx.account.update({
      where: { id: data.accountId },
      data:  { balance: { increment: delta } },
    })

    return created
  })

  return NextResponse.json(transaction, { status: 201 })
}