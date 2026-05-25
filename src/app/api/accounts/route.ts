import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const accountSchema = z.object({
  name:     z.string().min(1),
  type:     z.enum(['checking', 'savings', 'cash', 'credit']),
  balance:  z.number().default(0),
  currency: z.string().default('MXN'),
  color:    z.string().default('#6366f1'),
})

export async function GET() {
  const accounts = await prisma.account.findMany({
    include: { _count: { select: { transactions: true } } },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(accounts)
}

export async function POST(req: Request) {
  const body = await req.json()
  const data = accountSchema.parse(body)
  const account = await prisma.account.create({ data })
  return NextResponse.json(account, { status: 201 })
}