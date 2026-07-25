"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Search, Image as ImageIcon, Store } from "lucide-react";

export default function NovaCuradoriaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    setTimeout(() => {
      router.push("/admin/compras/curadoria");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/compras/curadoria"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Catalogar Produto (Curadoria)</h1>
          <p className="text-sm text-gray-500">Registre uma peça que você achou interessante para futura análise de compra.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <Search className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Detalhes da Peça</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Título / Nome da Peça <span className="text-red-500">*</span></label>
              <input required id="title" name="title" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Vestido Floral Verão Kyly" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Anotações / Descrição</label>
              <textarea id="description" name="description" rows={3} className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Detalhes sobre o tecido, caimento, numeração disponível..." />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="costPrice" className="text-sm font-medium text-gray-700">Preço de Custo (R$)</label>
              <input id="costPrice" name="costPrice" type="number" step="0.01" min="0" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: 45.90" />
            </div>

            <div className="space-y-2">
              <label htmlFor="suggestedPrice" className="text-sm font-medium text-gray-700">Preço Sugerido de Venda (R$)</label>
              <input id="suggestedPrice" name="suggestedPrice" type="number" step="0.01" min="0" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: 119.90" />
            </div>
          </div>
        </div>

        {/* Origem e Imagem */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <Store className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Origem e Referência Visual</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sourceLocation" className="text-sm font-medium text-gray-700">Local da Descoberta <span className="text-red-500">*</span></label>
              <input required id="sourceLocation" name="sourceLocation" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Feira FIT 0/16, Instagram, Catálogo..." />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="supplierId" className="text-sm font-medium text-gray-700">Fornecedor (Opcional)</label>
              <select id="supplierId" name="supplierId" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700">
                <option value="">-- Selecione se já existir --</option>
                {/* Aqui entrarão os fornecedores reais mapeados do banco */}
                <option value="1">Kyly Kids</option>
                <option value="2">Momi</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Foto da Peça (URL ou Upload)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <span className="relative rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      Fazer upload de um arquivo
                    </span>
                    <p className="pl-1">ou arrastar e soltar</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href="/admin/compras/curadoria"
            className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Curadoria
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
