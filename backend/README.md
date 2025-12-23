# 📄 Campus Boarding School Permission System (Backend)

Sistem Backend untuk pengelolaan perizinan keluar-masuk kampus asrama menggunakan **Express.js**, **PostgreSQL**, dan integrasi **Face Recognition**.

---

## 🚀 Fitur Utama

- **Autentikasi & Otorisasi**  
  Login menggunakan JWT (Access & Refresh Token) dengan pemisahan role **Admin** dan **Student**.

- **Manajemen Perizinan**  
  Pengajuan izin keluar oleh siswa dengan validasi rentang waktu.

- **Face Screening Integration**  
  Endpoint khusus untuk menerima _face embedding_ dari model AI dan menentukan status akses secara otomatis.

- **Automatic Violation Tracking**  
  Pencatatan otomatis pelanggaran jika siswa keluar tanpa izin atau terlambat kembali.

- **Attendance Logs**  
  Rekap riwayat keluar-masuk siswa secara real-time.

- **Swagger API Documentation**  
  Dokumentasi API interaktif untuk mempermudah pengujian endpoint.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Query Builder**: Knex.js
- **Security**:
  - Bcrypt (Password Hashing)
  - JWT (Authentication & Authorization)
  - Cookie-Parser
- **Documentation**: Swagger (`swagger-jsdoc`, `swagger-ui-express`)

---

## 📋 Prasyarat

- Node.js (v18+)
- PostgreSQL
- Postman (opsional, untuk testing manual)

---

## ⚙️ Instalasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/project-name.git
cd backend
2️⃣ Install Dependensi
bash
Copy code
npm install
3️⃣ Konfigurasi Environment
Buat file .env di root folder dan isi sesuai kebutuhan:

env
Copy code
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/db_name
JWT_SECRET=rahasia_super_kuat
JWT_REFRESH_SECRET=rahasia_refresh_token
NODE_ENV=development
4️⃣ Menjalankan Migrasi & Seeder
bash
Copy code
# Menjalankan tabel database
npx knex migrate:latest

# Mengisi data admin awal
# NIM: admin01
# Password: admin123
npx knex seed:run
5️⃣ Menjalankan Server
bash
Copy code
npm run dev
📖 Dokumentasi API
Setelah server berjalan, buka browser dan akses dokumentasi API interaktif di:

bash
Copy code
http://localhost:3000/api-docs
🗄️ Struktur Folder
plaintext
Copy code
backend/
├── config/             # Konfigurasi database & aplikasi
├── controllers/        # Logika route & Swagger JSDoc
├── middleware/         # Auth & validasi role
├── migrations/         # Skema tabel PostgreSQL
├── seeds/              # Data awal (Admin & Dummy)
├── services/           # Logika bisnis & query database
├── server.js           # Entry point aplikasi
└── .env                # Variabel lingkungan
```
