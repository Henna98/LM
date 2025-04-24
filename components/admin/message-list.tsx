"use client"

import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Check, MoreHorizontal, Trash2 } from "lucide-react"
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

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  isRead: boolean
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages: initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)

    // Mark as read if it wasn't already
    if (!message.isRead) {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, isRead: true } : m)))
    }
  }

  const handleDeleteMessage = (id: string) => {
    setMessageToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (messageToDelete) {
      setMessages(messages.filter((m) => m.id !== messageToDelete))
      setIsDeleteDialogOpen(false)
      setMessageToDelete(null)
    }
  }

  const markAsRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)))
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Nama</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Subjek</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Tanggal</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-400 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  Tidak ada pesan
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message.id} className={`hover:bg-gray-700/50 ${!message.isRead ? "bg-gray-700/20" : ""}`}>
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-white">{message.name}</div>
                    <div className="text-gray-400">{message.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleViewMessage(message)}
                      className="text-left hover:text-purple-400 transition-colors"
                    >
                      {message.subject}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {format(new Date(message.date), "d MMM yyyy, HH:mm", { locale: id })}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {message.isRead ? (
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        Dibaca
                      </Badge>
                    ) : (
                      <Badge className="bg-purple-700 hover:bg-purple-600">Baru</Badge>
                    )}
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
                          onClick={() => handleViewMessage(message)}
                        >
                          Lihat
                        </DropdownMenuItem>
                        {!message.isRead && (
                          <DropdownMenuItem
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() => markAsRead(message.id)}
                          >
                            Tandai Dibaca
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="hover:bg-gray-700 text-red-400 cursor-pointer"
                          onClick={() => handleDeleteMessage(message.id)}
                        >
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

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Dari: {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-700/50 rounded-md max-h-[300px] overflow-y-auto">
            <p className="text-gray-200 whitespace-pre-wrap">{selectedMessage?.message}</p>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Diterima pada:{" "}
            {selectedMessage && format(new Date(selectedMessage.date), "d MMMM yyyy, HH:mm", { locale: id })}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-300"
              onClick={() => {
                if (selectedMessage) {
                  handleDeleteMessage(selectedMessage.id)
                  setIsDialogOpen(false)
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-600 text-white" onClick={() => setIsDialogOpen(false)}>
              <Check className="h-4 w-4 mr-2" />
              Tutup
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
              Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.
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
