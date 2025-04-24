"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real application, you would validate credentials against a backend
      // This is a simplified example for demonstration
      if (email === "admin@misterinusantara.com" && password === "admin123") {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Set authentication in localStorage (in a real app, use secure cookies/JWT)
        localStorage.setItem("isAuthenticated", "true")
        router.push("/admin/dashboard?firstLoad=true")
      } else {
        setError("Email atau password salah. Silakan coba lagi.")
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full bg-black/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Misteri Logo"
              width={40}
              height={40}
              className="rounded-full border-2 border-purple-500"
            />
            <span className="text-xl font-bold text-purple-400">Misteri Nusantara</span>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-800 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.2)] p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Login Admin</h1>
              <p className="text-gray-400">Masuk untuk mengelola konten Misteri Nusantara</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="admin@misterinusantara.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Ingat saya
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="#" className="text-purple-400 hover:text-purple-300">
                    Lupa password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Untuk demo, gunakan:</p>
              <p className="text-gray-400">Email: admin@misterinusantara.com</p>
              <p className="text-gray-400">Password: admin123</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Misteri Nusantara. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}
