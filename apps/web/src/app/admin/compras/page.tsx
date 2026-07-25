import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Store, ShoppingCart, TrendingUp, Calendar, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ComprasDashboard() {
  // Fetch some metrics (with fallback for empty DB)
  const fornecedoresCount = await prisma.supplier.count().catch(() => 0);
  const curadoriaCount = await prisma.curatedProduct.count().catch(() => 0);
  const eventosCount = await prisma.commercialEvent.count().catch(() => 0);
  const tarefasCount = await prisma.purchaseTask.count().catch(() => 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestão de Compras e Curadoria</h1>
        <p className="text-gray-500 mt-2">Módulo exclusivo da Luciana: Centralize fornecedores, tendências e calendário comercial.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/compras/fornecedores" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex items-center space-x-4 group">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition">
            <Store className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Fornecedores</p>
            <h3 className="text-2xl font-bold text-gray-900">{fornecedoresCount}</h3>
          </div>
        </Link>
        <Link href="/admin/compras/curadoria" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex items-center space-x-4 group">
          <div className="p-3 bg-pink-50 text-pink-600 rounded-lg group-hover:bg-pink-100 transition">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Produtos Pesquisados</p>
            <h3 className="text-2xl font-bold text-gray-900">{curadoriaCount}</h3>
          </div>
        </Link>
        <Link href="/admin/compras/tendencias" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex items-center space-x-4 group">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Calendário Comercial</p>
            <h3 className="text-2xl font-bold text-gray-900">{eventosCount}</h3>
          </div>
        </Link>
        <Link href="/admin/compras/tarefas" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex items-center space-x-4 group">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg group-hover:bg-yellow-100 transition">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tarefas Pendentes</p>
            <h3 className="text-2xl font-bold text-gray-900">{tarefasCount}</h3>
          </div>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-lg text-gray-900">Ações Rápidas</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <Link href="/admin/compras/fornecedores/novo" className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <span className="font-medium text-gray-700">Cadastrar Novo Fornecedor</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/admin/compras/curadoria/novo" className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <span className="font-medium text-gray-700">Catalogar Produto em Curadoria</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/admin/compras/tarefas/novo" className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <span className="font-medium text-gray-700">Criar Lembrete de Compra</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
