"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  author: string
  featured: boolean
  published: boolean
}

interface NewsManagerProps {
  news: NewsItem[]
}

export function NewsManager({ news: initialNews }: NewsManagerProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newsToDelete, setNewsToDelete] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Form state for editing
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    featured: false,
    published: true,
  })

  const handleEditNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      category: newsItem.category,
      featured: newsItem.featured,
      published: newsItem.published,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteNews = (id: string) => {
    setNewsToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (newsToDelete) {
      setNews(news.filter((n) => n.id !== newsToDelete))
      setIsDeleteDialogOpen(false)
      setNewsToDelete(null)
    }
  }

  const handleAddNews = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Kisah Misteri",
      featured: false,
      published: true,
    })
    setSelectedNews(null)
    setIsAddDialogOpen(true)
  }

  const handleSaveNews = () => {
    if (selectedNews) {
      // Update existing news
      setNews(news.map((n) => (n.id === selectedNews.id ? { ...n, ...formData } : n)))
    } else {
      // Add new news
      const newNewsItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: formData.title || "Untitled",
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        category: formData.category || "Kisah Misteri",
        image: "/placeholder.svg?height=400&width=600&text=News Image",
        date: new Date().toISOString(),
        author: "Admin",
        featured: formData.featured || false,
        published: formData.published || true,
      }
      setNews([newNewsItem, ...news])
    }
    setIsEditDialogOpen(false)
    setIsAddDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const toggleFeatured = (id: string, featured: boolean) => {
    setNews(news.map((n) => (n.id === id ? { ...n, featured } : n)))
  }

  const togglePublished = (id: string, published: boolean) => {
    setNews(news.map((n) => (n.id === id ? { ...n, published } : n)))
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-purple-700 hover:bg-purple-600 text-white" onClick={handleAddNews}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Berita
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Judul</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Kategori</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Tanggal</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Unggulan</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {news.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  Tidak ada berita
                </td>
              </tr>
            ) : (
              news.map((newsItem) => (
                <tr key={newsItem.id} className="hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-white">{newsItem.title}</div>
                    <div className="text-gray-400 text-xs line-clamp-1">{newsItem.excerpt}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="outline" className="border-purple-600 text-purple-400">
                      {newsItem.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {format(new Date(newsItem.date), "d MMM yyyy", { locale: id })}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Switch
                      checked={newsItem.published}
                      onCheckedChange={(checked) => togglePublished(newsItem.id, checked)}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Switch
                      checked={newsItem.featured}
                      onCheckedChange={(checked) => toggleFeatured(newsItem.id, checked)}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
                        <DropdownMenuItem
                          className="hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleEditNews(newsItem)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-gray-700 text-red-400 cursor-pointer"
                          onClick={() => handleDeleteNews(newsItem.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Add News Dialog */}
      <Dialog
        open={isEditDialogOpen || isAddDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditDialogOpen(false)
            setIsAddDialogOpen(false)
          }
        }}
      >
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedNews ? "Edit Berita" : "Tambah Berita Baru"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedNews ? "Edit informasi berita di bawah ini." : "Isi formulir untuk menambahkan berita baru."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="title" className="text-gray-300">
                Judul
              </Label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="category" className="text-gray-300">
                Kategori
              </Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Kisah Misteri">Kisah Misteri</option>
                <option value="Fenomena">Fenomena</option>
                <option value="Berita">Berita</option>
                <option value="Ritual">Ritual</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="excerpt" className="text-gray-300">
                Ringkasan
              </Label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="content" className="text-gray-300">
                Konten
              </Label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="featured" className="text-gray-300">
                  Unggulan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleSwitchChange("published", checked)}
                  className="data-[state=checked]:bg-green-600"
                />
                <Label htmlFor="published" className="text-gray-300">
                  Publikasikan
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
              onClick={() => {
                setIsEditDialogOpen(false)
                setIsAddDialogOpen(false)
              }}
            >
              Batal
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-600 text-white" onClick={handleSaveNews}>
              {selectedNews ? "Simpan Perubahan" : "Tambah Berita"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription className="text-gray-400">
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button className="bg-red-700 hover:bg-red-600 text-white" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
