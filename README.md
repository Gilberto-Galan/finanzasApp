# 💰 FinanzApp — Control de Finanzas Personales

Aplicación web para gestionar ingresos, gastos, cuentas y presupuestos personales. Construida con Next.js 14, TypeScript, Prisma y SQLite.

## 🛠️ Stack

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 🖥️ Demo

<img width="1262" height="862" alt="Image" src="https://github.com/user-attachments/assets/2355457b-8210-4066-89c3-670f416201dc" />

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
