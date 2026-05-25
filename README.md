# 💰 FinanzApp — Control de Finanzas Personales

Aplicación web para gestionar ingresos, gastos, cuentas y presupuestos personales. Construida con Next.js 14, TypeScript, Prisma y SQLite.

## 🖥️ Demo

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

## ✨ Funcionalidades

- **Dashboard** con resumen financiero del mes (balance, ingresos, gastos, ahorro)
- **Transacciones** — registra ingresos y gastos con categoría, cuenta y fecha
- **Cuentas** — administra múltiples cuentas (cheques, ahorros, efectivo, crédito)
- **Presupuestos** — crea límites de gasto con barra de progreso visual
- **Categorías** — categorías predefinidas de ingresos y gastos
- Gráficas interactivas con Recharts
- Base de datos local con SQLite (sin configuración externa)

## 🛠️ Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS + shadcn/ui |
| Gráficas | Recharts |
| Backend | Next.js API Routes |
| ORM | Prisma 7 |
| Base de datos | SQLite (local) |

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/finanzas-personales.git
cd finanzas-personales

# 2. Instalar dependencias
npm install

# 3. Crear la base de datos y aplicar migraciones
npx prisma migrate dev

# 4. Sembrar datos iniciales (categorías y cuenta de ejemplo)
npx prisma db seed

# 5. Iniciar el servidor
npm run dev

# 6. Si quieres visualizar los datos de prisma
npx prisma studio

# 7 Resetear toda la base de datos
npx prisma migrate reset
# Te preguntara si estas seguro, escribe 'Y'
```