import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search, Tag, Image as ImageIcon, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function CuradoriaPage() {
  const produtos = await prisma.curatedProduct.findMany({
    include: { supplier: true },
    orderBy: { createdAt: 'desc' }
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Curadoria de Produtos</h1>
          <p className="text-gray-500 mt-1">Produtos pesquisados em feiras, catálogos e showrooms para possível compra.</p>
        </div>
        <Link 
          href="/admin/compras/curadoria/novo" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Catalogar Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {produtos.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <Search className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum produto em curadoria</h3>
            <p className="text-gray-500 mt-1 mb-6">Comece a catalogar peças interessantes que você achou durante sua pesquisa.</p>
            <Link 
              href="/admin/compras/curadoria/novo" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 py-2 px-4 transition"
            >
              Iniciar Curadoria
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-50/50">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition group">
                <div className="aspect-[4/5] bg-gray-100 relative flex items-center justify-center border-b border-gray-100 overflow-hidden">
                  {produto.imageUrl ? (
                    <img src={produto.imageUrl} alt={produto.title} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-gray-300" />
                  )}
                  {produto.status === 'APPROVED' && (
                    <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                      Aprovado
                    </span>
                  )}
                  {produto.status === 'REJECTED' && (
                    <span className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                      Descartado
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{produto.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{produto.description || "Sem descrição"}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {produto.costPrice ? `R$ ${produto.costPrice.toFixed(2)}` : 'Preço Indisponível'}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                      {produto.sourceLocation || "Local não informado"}
                    </div>
                    {produto.supplier && (
                      <div className="flex items-center text-xs text-gray-600">
                        <Tag className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                        {produto.supplier.tradeName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
