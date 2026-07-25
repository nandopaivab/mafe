import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Upload, Save } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {

  const categories = await prisma.category.findMany();

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/produtos" className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Produto</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Ex: Conjunto Moletom..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="Detalhes sobre o produto, tecido, etc..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="99.90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço Antigo (Opcional)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="129.90"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estoque</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                  >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagens do Produto</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer h-64">
                <div className="w-16 h-16 rounded-full bg-pastel-blue/30 text-primary flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <p className="text-gray-900 font-medium mb-1">Clique para fazer upload</p>
                <p className="text-gray-500 text-sm">ou arraste e solte as imagens aqui (PNG, JPG)</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/admin/produtos"
              className="px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="button" // Change to submit when implementing action
              className="bg-primary hover:bg-primary-foreground text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="h-5 w-5" />
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
