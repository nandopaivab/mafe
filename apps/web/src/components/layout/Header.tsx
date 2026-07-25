import Link from "next/link";
import { ShoppingCart, Menu, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-gray-600">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              MaFê <span className="text-secondary">Kids</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/roupas" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Roupas
          </Link>
          <Link href="/brinquedos" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Brinquedos
          </Link>
          <Link href="/acessorios" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Acessórios
          </Link>
          <Link href="/presentes" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Presentes
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <Link href="/admin" className="p-2 text-gray-600 hover:text-primary transition-colors hidden sm:block">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          <button className="p-2 text-gray-600 hover:text-primary transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-secondary text-[8px] font-bold text-white">
              0
            </span>
            <span className="sr-only">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
