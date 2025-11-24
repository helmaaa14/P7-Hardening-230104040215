# Praktikum 7 - Hardening RESTful API

## 📋 Identitas Mahasiswa
- **Nama:** Helma Afifah
- **NIM:** 230104040215
- **Kelas:** TI23A
- **Mata Kuliah:** Web Service Engineering
- **Topik:** Meningkatkan Keamanan, Logging, dan Monitoring pada RESTful API

---

## 📝 Deskripsi Project
Praktikum ini merupakan kelanjutan dari UTS. API Members yang telah dibuat sebelumnya diperkuat (hardening) dengan menambahkan:
- ✅ Lapisan keamanan (Helmet, CORS, Rate Limiting)
- ✅ Logging & monitoring request (Morgan)
- ✅ Global error handling
- ✅ Environment variable configuration
- ✅ Health check dan metrics endpoint

---

## 🛠️ Teknologi yang Digunakan

### Core
- **Runtime:** Node.js
- **Framework:** Express.js

### Security
- `helmet` - Security headers
- `cors` - Cross-Origin Resource Sharing
- `express-rate-limit` - Rate limiting protection

### Monitoring
- `morgan` - HTTP request logger
- `dotenv` - Environment variables

---

## 📂 Struktur Folder

```
P7-Hardening-230104040215/
├── controllers/
│   └── memberController.js
├── data/
│   └── members.js
├── routes/
│   └── memberRoutes.js
├── middlewares/
│   └── errorHandler.js
├── logs/
│   └── access.log (auto-generated)
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Cara Instalasi

1. Clone atau download project ini
2. Copy `.env.example` menjadi `.env`:
```bash
copy .env.example .env
```

3. Install dependencies:
```bash
npm install
```

4. Jalankan server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

---

## 🔐 Environment Variables

File `.env` berisi konfigurasi:

```env
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=1.0.0
API_NAME=Members API - Hardened
```

---

## 🌐 Endpoint API

### 1. Health Check
```
GET /api/health
```
Mengecek status kesehatan service.

### 2. Metrics
```
GET /api/metrics
```
Menampilkan metrics aplikasi (uptime, memory, total requests).

### 3. API Info
```
GET /api/info
```
Menampilkan informasi lengkap API dan konfigurasi security.

### 4. Members CRUD
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

---

## 🛡️ Fitur Keamanan

### 1. Helmet
Mengatur security headers HTTP untuk melindungi dari serangan umum.

### 2. CORS
Membatasi akses API hanya dari origin yang diizinkan.

### 3. Rate Limiting
Membatasi jumlah request untuk mencegah abuse:
- **Window:** 15 menit
- **Max Requests:** 100 per IP

Response jika limit terlampaui (429):
```json
{
  "status": "error",
  "message": "Too many requests from this IP, please try again later."
}
```

---

## 📊 Logging

### Morgan Logger
Setiap HTTP request dicatat ke:
1. **Console** (format: dev) - monitoring realtime
2. **File** `logs/access.log` (format: combined) - audit trail

**Contoh log:**
```
::1 - - [24/Nov/2025:10:00:00 +0000] "GET /api/members HTTP/1.1" 200 245
```

---

## ⚠️ Error Handling

### Global Error Handler
Semua error ditangani secara konsisten.

**Response format:**
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Error message here"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Endpoint not found"
}
```

---

## 📈 Status Code

- **200** - OK
- **201** - Created
- **204** - No Content
- **400** - Bad Request
- **404** - Not Found
- **429** - Too Many Requests
- **500** - Internal Server Error

---

## 🧪 Testing dengan Postman

### Endpoint untuk Testing:

1. `GET /api/health` - Health check
2. `GET /api/metrics` - Metrics
3. `GET /api/info` - API information
4. `GET /api/members` - Get all members
5. `GET /api/members/:id` - Get member by ID
6. `POST /api/members` - Create member
7. `PUT /api/members/:id` - Update member
8. `DELETE /api/members/:id` - Delete member
9. Rate limit test - Kirim request berulang kali hingga muncul 429

---

## 📊 Perbandingan dengan Versi UTS

| Aspek | UTS (Basic) | Praktikum 7 (Hardened) |
|-------|-------------|------------------------|
| Security Headers | ❌ | ✅ Helmet |
| CORS Protection | ❌ | ✅ Configured |
| Rate Limiting | ❌ | ✅ 100 req/15min |
| Request Logging | ❌ | ✅ Morgan |
| Error Handling | Basic | ✅ Global Handler |
| Environment Config | Hardcoded | ✅ .env |
| Health Check | ❌ | ✅ /api/health |
| Metrics | ❌ | ✅ /api/metrics |
| Production Ready | ❌ | ✅ Yes |

---

## ✅ Checklist Praktikum 7

- ✅ Helmet security headers aktif
- ✅ CORS dengan origin restriction
- ✅ Rate limiting (100 req/15min)
- ✅ Morgan logging ke file dan console
- ✅ Global error handler
- ✅ Environment variables (.env)
- ✅ Health check endpoint
- ✅ Metrics endpoint
- ✅ Struktur folder modular
- ✅ Dokumentasi lengkap

---

## 🎯 Kesimpulan

API Members telah berhasil di-hardening dengan penambahan:
1. **Security Layer** - Helmet, CORS, Rate Limiting
2. **Observability** - Logging dengan Morgan
3. **Monitoring** - Health check dan metrics
4. **Error Handling** - Global error handler
5. **Configuration Management** - Environment variables

API ini sekarang siap untuk production-level deployment dengan standar keamanan dan monitoring yang baik.

---

**Dikerjakan oleh:**  
Helma Afifah - 230104040215 - TI23A  
Web Service Engineering - Praktikum 7 - Semester Ganjil 20251