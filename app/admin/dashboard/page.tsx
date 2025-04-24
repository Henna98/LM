"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageList } from "@/components/admin/message-list"
import { NewsManager } from "@/components/admin/news-manager"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

// Mock data for demonstration
import { messages, news } from "@/lib/mock-data"

export default function AdminDashboard() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Check if user is authenticated (in a real app, this would verify a token or session)
  useEffect(() => {
    setIsClient(true)
    // This is a simplified check - in a real app, you'd verify authentication status
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      router.push("/login")
    } else {
      // If this is the first load after login, set authentication
      if (window.location.search.includes("firstLoad=true")) {
        localStorage.setItem("isAuthenticated", "true")
        router.replace("/admin/dashboard")
      }
    }
  }, [router])

  if (!isClient) {
    return null // Prevent rendering until we've checked authentication
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pesan</CardTitle>
            <CardDescription className="text-gray-400">Pesan dari pengunjung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{messages.length}</div>
            <p className="text-sm text-gray-400 mt-2">{messages.filter((m) => !m.isRead).length} pesan belum dibaca</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Berita</CardTitle>
            <CardDescription className="text-gray-400">Artikel yang dipublikasikan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{news.length}</div>
            <p className="text-sm text-gray-400 mt-2">{news.filter((n) => n.featured).length} artikel unggulan</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pengunjung</CardTitle>
            <CardDescription className="text-gray-400">30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">12,845</div>
            <p className="text-sm text-gray-400 mt-2">
              <span className="text-green-400">↑ 12%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="messages" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
              Pesan
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
              Berita
            </TabsTrigger>
          </TabsList>

          <Button className="bg-purple-700 hover:bg-purple-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Baru
          </Button>
        </div>

        <TabsContent value="messages" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Pesan Masuk</CardTitle>
              <CardDescription className="text-gray-400">Kelola pesan dari pengunjung website</CardDescription>
            </CardHeader>
            <CardContent>
              <MessageList messages={messages} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Manajemen Berita</CardTitle>
              <CardDescription className="text-gray-400">Tambah, edit, dan hapus berita</CardDescription>
            </CardHeader>
            <CardContent>
              <NewsManager news={news} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
