# Game THR 🌙

**Game THR** adalah aplikasi berbasis web yang dirancang untuk membagikan Tunjangan Hari Raya (THR) dengan cara yang lebih interaktif, seru, dan berkesan. Mengusung tema Lebaran yang kental dengan nuansa hijau ketupat, aplikasi ini mengubah proses pembagian uang menjadi sebuah permainan keberuntungan yang menyenangkan.

## 🚀 Fitur Utama

- **Atur Nominal THR**: Masukkan daftar nominal uang yang ingin Anda bagikan secara dinamis.
- **Pilihan Mode Permainan**:
  - **Kocok Amplop**: Rasakan sensasi mengetuk dan mengocok amplop digital hingga terbuka.
  - **Buka Kartu**: Pilih kartu keberuntungan Anda untuk mengungkap kejutan di baliknya.
- **Desain Premium Lebaran**: Antarmuka modern dengan palet warna hijau khas Idulfitri (`#C0D890`, `#90C078`, `#609060`, `#304830`).
- **Responsif & Ringan**: Dioptimalkan untuk perangkat seluler dengan fitur panduan yang dapat dilipat (_collapsible tutorial_).
- **SEO & Social Sharing Ready**: Metadata lengkap untuk pencarian Google dan tampilan profesional saat dibagikan ke WhatsApp/Telegram.

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan [Animate.css](https://animatedcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Animasi**: [GSAP](https://greensock.com/gsap/) & [Lucide Vue Next](https://lucide.dev/)
- **Ikon**: [Iconify](https://iconify.design/) (@iconify/vue)
- **Deployment**: [Docker](https://www.docker.com/) & [GitHub Actions](https://github.com/features/actions)

## 📦 Memulai Pengembangan

### Prasyarat

- Node.js (versi terbaru direkomendasikan)
- npm atau yarn

### Instalasi

```bash
# Clone repositori
git clone https://github.com/tukucode/thr-game-web.git

# Masuk ke direktori proyek
cd thr-game-web

# Instal dependensi
npm install
```

### Jalankan Mode Pengembangan

```bash
npm run dev
```

### Build untuk Produksi

```bash
npm run build
```

## 🐳 Docker Deployment

Proyek ini dilengkapi dengan `Dockerfile` untuk deployment berbasis container.

```bash
# Build image
docker build -t web-gamethr .

# Jalankan container
docker run -d -p 3001:3001 web-gamethr
```

## 📄 Lisensi

Proyek ini dikembangkan oleh **[tukucode.com](https://tukucode.com)**. Silakan merujuk pada ketentuan repositori untuk informasi lebih lanjut mengenai kontribusi dan penggunaan.

---

_Dibuat dengan ❤️ untuk menyemarakkan hari raya._
