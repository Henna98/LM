"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "components/ui/button"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Beranda", href: "#" },
    { name: "Kisah Misteri", href: "#stories" },
    { name: "Berita Terbaru", href: "#news" },
    { name: "Kontak", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Misteri Logo"
              width={40}
              height={40}
              className="rounded-full border-2 border-purple-500"
            />
            <span className="text-xl font-bold text-purple-400">Misteri Nusantara</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-300 hover:text-purple-400 transition-colors">
                {item.name}
              </Link>
            ))}
            <Link href="/login">
              <Button className="bg-purple-700 hover:bg-purple-600 text-white ml-2">Login</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col p-6"
        >
          <div className="flex justify-end">
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-300">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl text-gray-300 hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login" className="w-full">
              <Button className="bg-purple-700 hover:bg-purple-600 text-white mt-4 w-full">Login</Button>
            </Link>
          </nav>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Haunted Background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Jelajahi Misteri <span className="text-red-500">Tersembunyi</span> Nusantara
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300"
          >
            Kisah-kisah misterius dan fenomena supernatural dari seluruh penjuru Indonesia
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="bg-red-700 hover:bg-red-600 text-white px-8 py-6 text-lg">Baca Kisah Misteri</Button>
            <Button className="bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-950 px-8 py-6 text-lg">
              Berita Terbaru
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
              className="w-2 h-2 bg-purple-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Stories Section */}
      <section id="stories" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kisah Misteri Populer</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Temukan kisah-kisah misterius yang telah memikat ribuan pembaca dan menjadi perbincangan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item * 0.1 }}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-shadow duration-300"
              >
                <div className="relative h-60">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Misteri ${item}`}
                    alt={`Kisah Misteri ${item}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-red-700 text-white px-3 py-1 text-sm rounded">
                    Kisah Nyata
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Misteri Rumah Tua di {item === 1 ? "Bandung" : item === 2 ? "Yogyakarta" : "Surabaya"}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Kisah menyeramkan tentang rumah tua yang telah ditinggalkan selama puluhan tahun namun masih
                    terdengar suara-suara aneh...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">12 Oktober 2023</span>
                    <Button className="bg-transparent hover:bg-transparent text-purple-400 hover:text-purple-300 p-0 underline">
                      Baca Selengkapnya
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950">
              Lihat Semua Kisah
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Berita Terbaru</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Update terkini tentang fenomena supernatural dan peristiwa misterius dari berbagai daerah
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item * 0.1 }}
                className="flex flex-col md:flex-row gap-6 bg-gray-900 rounded-lg overflow-hidden p-6"
              >
                <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Berita ${item}`}
                    alt={`Berita ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-purple-900 text-purple-300 px-2 py-1 text-xs rounded">Fenomena</span>
                    <span className="text-sm text-gray-500">5 November 2023</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {item === 1
                      ? "Penampakan Misterius Terekam CCTV di Museum Nasional"
                      : "Suara Tangisan Anak Kecil di Hutan Angker Kalimantan"}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {item === 1
                      ? "Petugas keamanan museum dikejutkan dengan penampakan sosok misterius yang terekam kamera CCTV pada tengah malam..."
                      : "Sekelompok pendaki mengaku mendengar suara tangisan anak kecil saat berkemah di hutan yang konon angker..."}
                  </p>
                  <Button className="bg-transparent hover:bg-transparent text-purple-400 hover:text-purple-300 p-0 underline">
                    Baca Selengkapnya
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={`mini-${item}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                className="bg-gray-900 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-red-900/60 text-red-300 px-2 py-1 text-xs rounded">Update</span>
                  <span className="text-xs text-gray-500">2 November 2023</span>
                </div>
                <h4 className="text-lg font-medium mb-2 text-white">Ritual Misterius Ditemukan di Gua Terpencil</h4>
                <p className="text-sm text-gray-400">
                  Tim peneliti menemukan bukti ritual kuno yang masih dilakukan secara rahasia...
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/40 to-red-900/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Dapatkan Kisah Misteri Terbaru</h2>
            <p className="text-gray-300 mb-6">
              Berlangganan newsletter kami dan dapatkan kisah-kisah misterius langsung ke inbox Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-700 hover:bg-purple-600 text-white">Berlangganan</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Kami</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Punya kisah misterius untuk dibagikan? Atau ingin berkolaborasi dengan kami? Jangan ragu untuk menghubungi
              tim kami
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800 p-8 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-6">Kirim Pesan</h3>
              <form className="space-y-4" id="contactForm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-600 text-white"
                  onClick={(e) => {
                    e.preventDefault()
                    const form = document.getElementById("contactForm") as HTMLFormElement
                    if (form) {
                      const formData = new FormData(form)
                      const name = formData.get("name") as string
                      const email = formData.get("email") as string
                      const subject = formData.get("subject") as string
                      const message = formData.get("message") as string

                      if (name && email && subject && message) {
                        alert("Pesan berhasil dikirim! Admin akan menerima pesan Anda.")
                        form.reset()
                      } else {
                        alert("Mohon isi semua field yang diperlukan.")
                      }
                    }
                  }}
                >
                  Kirim Pesan
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Email</h4>
                    <p className="text-gray-400">info@misterinusantara.com</p>
                    <p className="text-gray-400">support@misterinusantara.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">WhatsApp</h4>
                    <p className="text-gray-400">+62 812 3456 7890</p>
                    <p className="text-gray-400">+62 878 9012 3456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Alamat</h4>
                    <p className="text-gray-400">Jl. Misteri No. 13, Kawasan Angker, Jakarta Selatan, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.29279019987!2d106.7588675!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1699000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Misteri Logo"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-purple-500"
                />
                <span className="text-xl font-bold text-purple-400">Misteri Nusantara</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Portal kisah misteri dan fenomena supernatural dari seluruh penjuru Nusantara. Mengungkap yang
                tersembunyi.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">info@misterinusantara.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">+62 812 3456 7890</span>
                </div>
                <div className="mt-6">
                  <div className="h-32 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.29279019987!2d106.7588675!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1699000000000!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex md:justify-end">
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Menu</h3>
                <nav className="grid grid-cols-1 gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/login" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Login
                  </Link>
                </nav>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 text-white">Ikuti Kami</h3>
                  <div className="flex gap-4">
                    <a href="#" className="bg-gray-800 hover:bg-purple-900 transition-colors p-2 rounded-full">
                      <span className="sr-only">Facebook</span>
                      <Facebook className="h-5 w-5 text-purple-400" />
                    </a>
                    <a href="#" className="bg-gray-800 hover:bg-purple-900 transition-colors p-2 rounded-full">
                      <span className="sr-only">Twitter</span>
                      <Twitter className="h-5 w-5 text-purple-400" />
                    </a>
                    <a href="#" className="bg-gray-800 hover:bg-purple-900 transition-colors p-2 rounded-full">
                      <span className="sr-only">Instagram</span>
                      <Instagram className="h-5 w-5 text-purple-400" />
                    </a>
                    <a href="#" className="bg-gray-800 hover:bg-purple-900 transition-colors p-2 rounded-full">
                      <span className="sr-only">Youtube</span>
                      <Youtube className="h-5 w-5 text-purple-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Misteri Nusantara. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Smooth Scroll Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 300 ? 1 : 0 }}
        className="fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  )
}
