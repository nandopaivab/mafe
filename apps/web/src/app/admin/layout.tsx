"use client";

import { FirebaseAuthProvider, useFirebaseAuth } from "@/components/providers/FirebaseAuthProvider";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {user && pathname !== "/admin/login" ? (
        <>
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
              <Link href="/admin" className="text-xl font-bold text-primary">
                MaFê Kids <span className="text-gray-400 text-sm font-normal">Admin</span>
              </Link>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-3">
                <li>
                  <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-100">
                    <LayoutDashboard className="h-5 w-5 text-gray-500" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/produtos" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <Package className="h-5 w-5 text-gray-400" />
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/admin/pedidos" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <ShoppingCart className="h-5 w-5 text-gray-400" />
                    Pedidos
                  </Link>
                </li>
                <li>
                  <Link href="/admin/compras" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-pink-700 hover:bg-pink-50 hover:text-pink-900 bg-pink-50/50">
                    <Package className="h-5 w-5 text-pink-500" />
                    Compras (Luciana)
                  </Link>
                </li>
                <li>
                  <Link href="/admin/clientes" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <Users className="h-5 w-5 text-gray-400" />
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link href="/admin/configuracoes" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <Settings className="h-5 w-5 text-gray-400" />
                    Configurações
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {user.email?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Administrador</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </aside>
          {/* Main content */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
      )}
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </FirebaseAuthProvider>
  );
}
