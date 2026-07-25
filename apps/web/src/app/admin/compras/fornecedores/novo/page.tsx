"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Building2, Link as LinkIcon, FileText } from "lucide-react";

export default function NovoFornecedorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // In a real app, this would be an API call to a Next.js Server Action or API Route
    // For now, we simulate a successful save to let the user see the flow
    setTimeout(() => {
      router.push("/admin/compras/fornecedores");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/compras/fornecedores"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Novo Fornecedor</h1>
          <p className="text-sm text-gray-500">Cadastre um novo parceiro comercial no sistema.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Principais */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Dados Principais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="tradeName" className="text-sm font-medium text-gray-700">Nome Fantasia / Marca <span className="text-red-500">*</span></label>
              <input required id="tradeName" name="tradeName" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Kyly Kids" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="legalName" className="text-sm font-medium text-gray-700">Razão Social</label>
              <input id="legalName" name="legalName" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Kyly Indústria Têxtil Ltda" />
            </div>

            <div className="space-y-2">
              <label htmlFor="cnpj" className="text-sm font-medium text-gray-700">CNPJ</label>
              <input id="cnpj" name="cnpj" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="00.000.000/0000-00" />
            </div>
          </div>
        </div>

        {/* Contato e Catálogo */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <LinkIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Contato & Catálogos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contactName" className="text-sm font-medium text-gray-700">Nome do Representante</label>
              <input id="contactName" name="contactName" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: João Silva" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">WhatsApp / Telefone</label>
              <input id="whatsapp" name="whatsapp" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="(11) 99999-9999" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="catalogUrl" className="text-sm font-medium text-gray-700">Link do Catálogo (Drive, Site, B2B)</label>
              <input id="catalogUrl" name="catalogUrl" type="url" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* Condições Comerciais */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Condições Comerciais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="minOrderQuantity" className="text-sm font-medium text-gray-700">Pedido Mínimo (Pçs)</label>
              <input id="minOrderQuantity" name="minOrderQuantity" type="number" min="0" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: 50" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="minOrderValue" className="text-sm font-medium text-gray-700">Pedido Mínimo (R$)</label>
              <input id="minOrderValue" name="minOrderValue" type="number" step="0.01" min="0" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: 1500.00" />
            </div>

            <div className="space-y-2">
              <label htmlFor="deliveryTime" className="text-sm font-medium text-gray-700">Prazo Médio de Entrega</label>
              <input id="deliveryTime" name="deliveryTime" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: 15 dias úteis" />
            </div>
            
            <div className="space-y-2 md:col-span-3">
              <label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700">Condições de Pagamento</label>
              <input id="paymentTerms" name="paymentTerms" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: 30/60/90 dias no boleto, 5% desc à vista" />
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
            href="/admin/compras/fornecedores"
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
                Salvar Fornecedor
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
