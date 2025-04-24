"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { BarChart3, Bell, ChevronDown, FileText, Home, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Pesan", href: "/admin/messages", icon: MessageSquare },
    { name: "Berita", href: "/admin/news", icon: FileText },
    { name: "Statistik", href: "/admin/statistics", icon: BarChart3 },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/admin/dashboard" className="flex items-center gap-2 ml-2 lg:ml-0">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Misteri Logo"
                width={32}
                height={32}
                className="rounded-full border-2 border-purple-500"
              />
              <span className="text-lg font-bold text-purple-400 hidden md:inline-block">Admin Panel</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden md:inline-block">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-gray-200">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-gray-800 border-r border-gray-700 pt-16 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="mt-6 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    isActive ? "bg-purple-900/50 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-10 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
