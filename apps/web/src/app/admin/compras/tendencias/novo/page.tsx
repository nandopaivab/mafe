"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, CalendarDays, MapPin } from "lucide-react";

export default function NovoEventoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    setTimeout(() => {
      router.push("/admin/compras/tendencias");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/compras/tendencias"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Agendar Novo Evento</h1>
          <p className="text-sm text-gray-500">Marque a próxima feira de moda, viagem ou lançamento de coleção.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Detalhes do Evento</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Nome do Evento <span className="text-red-500">*</span></label>
              <input required id="title" name="title" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Feira FIT 0/16 Primavera/Verão" />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-gray-700">Tipo de Evento <span className="text-red-500">*</span></label>
              <select required id="type" name="type" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700">
                <option value="FAIR">Feira / Exposição</option>
                <option value="TRIP">Viagem de Compras</option>
                <option value="LAUNCH">Lançamento de Coleção</option>
                <option value="OTHER">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="relatedSeason" className="text-sm font-medium text-gray-700">Coleção / Temporada Relacionada</label>
              <input id="relatedSeason" name="relatedSeason" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Verão 26" />
            </div>

            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-700">Data de Início <span className="text-red-500">*</span></label>
              <input required id="startDate" name="startDate" type="date" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700">Data de Término <span className="text-red-500">*</span></label>
              <input required id="endDate" name="endDate" type="date" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="location" className="text-sm font-medium text-gray-700">Local (Opcional)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input id="location" name="location" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent pl-10 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ex: Expo Center Norte, São Paulo" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Notas Adicionais</label>
              <textarea id="description" name="description" rows={3} className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Informações de voo, hotel, stands prioritários..." />
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
            href="/admin/compras/tendencias"
            className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Agendando..." : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Agendar Evento
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
