'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  PiggyBank,
  Tag,
} from 'lucide-react'

const links = [
  { href: '/',               label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/transactions',   label: 'Transacciones',  icon: ArrowLeftRight  },
  { href: '/accounts',       label: 'Cuentas',        icon: Wallet          },
  { href: '/budgets',        label: 'Presupuestos',   icon: PiggyBank       },
  { href: '/categories',     label: 'Categorías',     icon: Tag             },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
          <PiggyBank className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-white">FinanzApp</span>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${active
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-2 py-4 text-xs text-slate-600">
        FinanzApp v1.0
      </div>
    </aside>
  )
}