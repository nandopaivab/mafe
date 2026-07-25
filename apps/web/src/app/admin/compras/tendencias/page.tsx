import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, CalendarDays, MapPin, Tag } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function TendenciasCalendarioPage() {
  const eventos = await prisma.commercialEvent.findMany({
    orderBy: { startDate: 'asc' }
  }).catch(() => []);

  // Format dates for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Calendário Comercial</h1>
          <p className="text-gray-500 mt-1">Planeje compras, feiras de moda, viagens e lançamentos de coleções.</p>
        </div>
        <Link 
          href="/admin/compras/tendencias/novo" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {eventos.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <CalendarDays className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Seu calendário está vazio</h3>
            <p className="text-gray-500 mt-1 mb-6">Adicione a próxima viagem de compras, Feira FIT ou lançamento de coleção.</p>
            <Link 
              href="/admin/compras/tendencias/novo" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 py-2 px-4 transition"
            >
              Criar Primeiro Evento
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {eventos.map((evento) => {
              const isPast = new Date(evento.endDate) < new Date();
              const isOngoing = new Date(evento.startDate) <= new Date() && new Date(evento.endDate) >= new Date();
              
              return (
                <div key={evento.id} className={`p-6 hover:bg-gray-50 transition ${isPast ? 'opacity-60' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          evento.type === 'FAIR' ? 'bg-blue-100 text-blue-700' :
                          evento.type === 'TRIP' ? 'bg-purple-100 text-purple-700' :
                          evento.type === 'LAUNCH' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {evento.type === 'FAIR' && 'Feira / Evento'}
                          {evento.type === 'TRIP' && 'Viagem de Compras'}
                          {evento.type === 'LAUNCH' && 'Lançamento de Coleção'}
                          {evento.type === 'OTHER' && 'Outro'}
                        </span>
                        
                        {isOngoing && (
                          <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                            Acontecendo Agora
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900">{evento.title}</h3>
                      {evento.description && <p className="text-sm text-gray-500 mt-1">{evento.description}</p>}
                      
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarDays className="w-4 h-4 mr-1.5 text-gray-400" />
                          <span className="font-medium">{formatDate(evento.startDate)}</span> 
                          {evento.startDate.getTime() !== evento.endDate.getTime() && (
                            <>
                              <span className="mx-1 text-gray-400">até</span>
                              <span className="font-medium">{formatDate(evento.endDate)}</span>
                            </>
                          )}
                        </div>
                        
                        {evento.location && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                            {evento.location}
                          </div>
                        )}
                        
                        {evento.relatedSeason && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Tag className="w-4 h-4 mr-1.5 text-gray-400" />
                            Coleção: {evento.relatedSeason}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <button className="text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg transition">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
