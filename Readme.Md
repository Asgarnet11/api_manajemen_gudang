# Sistem Manajemen Gudang & Ekspedisi (Backend REST API)

Ini adalah server backend REST API untuk Sistem Manajemen Gudang & Ekspedisi. Dibangun dengan Node.js, Express, dan Prisma ORM, API ini menyediakan semua logika bisnis, interaksi database, dan autentikasi yang diperlukan untuk aplikasi frontend.

API ini dirancang untuk menjadi _stateless_ dan menggunakan JSON Web Tokens (JWT) untuk mengamankan _endpoint_.

---

## ✨ Fitur & Endpoint Utama

API ini menyediakan serangkaian _endpoint_ yang terstruktur berdasarkan sumber daya (resource).

- **Autentikasi (`/api/auth`)**

  - `POST /register`: Mendaftarkan pengguna baru (Admin/Staff).
  - `POST /login`: Login pengguna dan mendapatkan token JWT.

- **Pengguna (`/api/users`)**

  - `GET /profile`: Mendapatkan profil pengguna yang sedang login (memerlukan token).

- **Pelanggan (`/api/customers`)**

  - Menyediakan fungsionalitas CRUD (Create, Read, Update, Delete) penuh untuk data pelanggan.

- **Inventaris (`/api/inventory`)**

  - `POST /in`: Mencatat barang masuk baru dengan sistem _ledger_ (V2).
  - `GET /:itemId/history`: Melihat riwayat pergerakan (ledger) untuk satu barang (V2).
  - `GET /low-stock`: Mendapatkan daftar barang dengan stok di bawah minimum (V2).
  - `GET /dashboard-analytics`: Menyediakan data agregat untuk dashboard frontend (V2).

- **Barang (`/api/items`)**

  - `PATCH /:id/status`: Mengubah status barang (misal: dari 'masuk gudang' ke 'keluar gudang').

- **Pengiriman (`/api/shipments`)**

  - `POST /`: Membuat entitas pengiriman/kontainer baru (V2, khusus Admin).
  - `GET /`: Melihat daftar semua pengiriman.
  - `GET /:id`: Melihat detail satu pengiriman beserta barang di dalamnya (V2).
  - `GET /available-items`: Mendapatkan daftar barang yang tersedia untuk dimasukkan ke pengiriman (V2).
  - `POST /:id/add-items`: Menambahkan satu atau lebih barang ke dalam pengiriman (V2).

- **Faktur (`/api/invoices`)**
  - `POST /`: Membuat faktur baru dari data pengiriman (V2, khusus Admin).
  - `GET /`: Melihat daftar semua faktur.

---

## 🛠️ Teknologi yang Digunakan

- **Runtime**: [Node.js](https-nodejs-org)
- **Framework**: [Express.js](https-expressjs-com)
- **Database ORM**: [Prisma](https-www-prisma-io)
- **Database**: [PostgreSQL](https-www-postgresql-org)
- **Autentikasi**: [JSON Web Tokens (JWT)](https-jwt-io)
- **Password Hashing**: [Bcrypt.js](https-github-com-dcodeIO-bcrypt-js)
- **Manajemen Environment**: [dotenv](https-github-com-motdotla-dotenv)

---

## 🚀 Instalasi & Menjalankan Secara Lokal

Ikuti langkah-langkah ini untuk menjalankan server di mesin lokal Anda.

### Prasyarat

- [Node.js](https-nodejs-org) (versi 18.x atau lebih tinggi)
- npm (terinstal bersama Node.js)
- Sebuah server database **PostgreSQL** yang sedang berjalan (bisa di lokal, Docker, atau menggunakan layanan cloud gratis seperti [Supabase](https-supabase-com) atau [Railway](https-railway-app)).

### Langkah-langkah Instalasi

1.  **Clone repositori ini:**

    ```bash
    git clone https-github-com-username-ekspedisi-gudang-api-git
    cd ekspedisi-gudang-api
    ```

2.  **Instal semua dependensi:**

    ```bash
    npm install
    ```

3.  **Siapkan file environment variable:**
    Buat sebuah file baru bernama `.env` di root folder proyek.

4.  **Konfigurasi environment variable:**
    Buka file `.env` dan isi dengan konfigurasi Anda. Salin konten di bawah ini dan sesuaikan nilainya.

    ```
    # Konfigurasi Database (Contoh menggunakan Supabase/PostgreSQL)
    DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

    # Kunci Rahasia untuk JSON Web Token (JWT)
    # Ganti dengan kalimat acak yang sangat panjang dan aman
    JWT_SECRET="ini-adalah-kunci-rahasia-yang-sangat-aman-dan-sulit-ditebak-12345"

    # Port Server (opsional, default 5000)
    PORT=5001
    ```

### Penyiapan Database dengan Prisma

- Setelah file `.env` terisi dengan benar, jalankan perintah ini untuk menerapkan skema database (membuat semua tabel dan relasi):
  ```bash
  npx prisma migrate dev
  ```
  Prisma akan membaca file `prisma/schema.prisma` dan mengkonfigurasi database Anda.

### Menjalankan Server

- Untuk memulai server pengembangan dengan auto-reload (menggunakan nodemon), jalankan:
  ```bash
  npm run dev
  ```
- Server akan berjalan di port yang Anda tentukan di file `.env` (atau port 5000).

---

## 🚀 Deployment

Proyek ini dirancang untuk di-deploy ke platform hosting Node.js seperti [Railway](https-railway-app) atau [Render](https-render-com).

- **Build Command**: `npm run build && npm install`
- **Start Command**: `npm start`

Pastikan Anda mengatur semua **Environment Variables** (`DATABASE_URL`, `JWT_SECRET`) di dashboard platform hosting Anda. Perintah `build` di atas akan secara otomatis menjalankan `npx prisma migrate deploy` untuk menyiapkan database di lingkungan production.
