import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Building2, Phone, ExternalLink, Star } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function FornecedoresPage() {
  const fornecedores = await prisma.supplier.findMany({
    orderBy: { createdAt: 'desc' }
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Fornecedores</h1>
          <p className="text-gray-500 mt-1">Gerencie seus parceiros comerciais, catálogos e condições de compra.</p>
        </div>
        <Link 
          href="/admin/compras/fornecedores/novo" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Fornecedor
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {fornecedores.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <Building2 className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum fornecedor cadastrado</h3>
            <p className="text-gray-500 mt-1 mb-6">Comece adicionando o seu primeiro fornecedor de moda infantil ou brinquedos.</p>
            <Link 
              href="/admin/compras/fornecedores/novo" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 py-2 px-4 transition"
            >
              Cadastrar Fornecedor
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nome / Marca</th>
                  <th className="px-6 py-4 font-semibold">Contato</th>
                  <th className="px-6 py-4 font-semibold">Catálogo</th>
                  <th className="px-6 py-4 font-semibold">Condições</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fornecedores.map((fornecedor) => (
                  <tr key={fornecedor.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{fornecedor.tradeName}</div>
                      <div className="text-xs text-gray-500 mt-1">{fornecedor.legalName} • {fornecedor.cnpj}</div>
                      <div className="flex items-center mt-2 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-1 text-xs text-gray-600 font-medium">{fornecedor.rating || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">{fornecedor.contactName || 'Não informado'}</div>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        <span className="text-xs">{fornecedor.whatsapp || fornecedor.email || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {fornecedor.catalogUrl ? (
                        <a href={fornecedor.catalogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-xs font-medium">
                          Ver Catálogo <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">Sem catálogo</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Mín:</span> {fornecedor.minOrderQuantity ? `${fornecedor.minOrderQuantity} pçs` : 'Livre'}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">Prazo:</span> {fornecedor.deliveryTime || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/compras/fornecedores/${fornecedor.id}`} className="text-primary hover:text-primary/80 font-medium text-sm transition">
                        Ver Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
