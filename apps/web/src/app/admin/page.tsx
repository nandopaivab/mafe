import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {

  // Mock data for dashboard
  const stats = [
    { title: "Receita Total", value: "R$ 24.500,00", icon: <DollarSign className="h-6 w-6 text-emerald-600" />, bgColor: "bg-emerald-100" },
    { title: "Pedidos (Mês)", value: "145", icon: <ShoppingBag className="h-6 w-6 text-blue-600" />, bgColor: "bg-blue-100" },
    { title: "Novos Clientes", value: "48", icon: <Users className="h-6 w-6 text-purple-600" />, bgColor: "bg-purple-100" },
    { title: "Taxa de Conversão", value: "3.2%", icon: <TrendingUp className="h-6 w-6 text-orange-600" />, bgColor: "bg-orange-100" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Pedidos Recentes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Pedido #{1020 + i}</p>
                  <p className="text-sm text-gray-500">Maria Oliveira - Há 2 horas</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">R$ 159,90</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Aguardando Pagamento
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Produtos Mais Vendidos</h2>
          <div className="space-y-4">
            {[
              { name: "Conjunto Moletom Infantil Dino", sales: 42, stock: 15 },
              { name: "Vestido Floral Primavera", sales: 28, stock: 5 },
              { name: "Macacão Bebê Algodão Urso", sales: 15, stock: 30 },
            ].map((prod, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{prod.name}</p>
                  <p className="text-sm text-gray-500">{prod.sales} vendas este mês</p>
                </div>
                <div className="text-right ml-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prod.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {prod.stock} em estoque
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
