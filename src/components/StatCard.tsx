import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title:     string
  value:     string
  subtitle?: string
  icon:      LucideIcon
  color:     'indigo' | 'green' | 'red' | 'blue'
}

const colors = {
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  green:  'bg-green-500/10  text-green-400  border-green-500/20',
  red:    'bg-red-500/10    text-red-400    border-red-500/20',
  blue:   'bg-blue-500/10   text-blue-400   border-blue-500/20',
}

const iconColors = {
  indigo: 'bg-indigo-500/20 text-indigo-400',
  green:  'bg-green-500/20  text-green-400',
  red:    'bg-red-500/20    text-red-400',
  blue:   'bg-blue-500/20   text-blue-400',
}

export default function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-6 ${colors[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${iconColors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}