Praktikum 7 - Hardening RESTful API
Identitas Mahasiswa

Nama: Helma Afifah
NIM: 230104040215
Kelas: TI23A
Mata Kuliah: Web Service Engineering
Topik: Meningkatkan Keamanan, Logging, dan Monitoring pada RESTful API

Deskripsi Project
Praktikum ini merupakan kelanjutan dari UTS. API Members yang telah dibuat sebelumnya diperkuat (hardening) dengan menambahkan:

Lapisan keamanan (Helmet, CORS, Rate Limiting)
Logging & monitoring request (Morgan)
Global error handling
Environment variable configuration (.env)
Health check dan metrics endpoint

Teknologi yang Digunakan

Runtime: Node.js
Framework: Express.js
Security:

helmet - Security headers
cors - Cross-Origin Resource Sharing
express-rate-limit - Rate limiting


Logging: morgan - HTTP request logger
Configuration: dotenv - Environment variables

Struktur Folder
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
Cara Instalasi

Clone atau download project ini
Copy .env.example menjadi .env:

bashcopy .env.example .env

Install dependencies:

bashnpm install

Jalankan server:

bashnpm run dev
Server akan berjalan di http://localhost:3000
Environment Variables
File .env berisi konfigurasi:
bashPORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=1.0.0
API_NAME=Members API - Hardened
Penjelasan:

PORT: Port server (default: 3000)
NODE_ENV: Environment mode (development/production)
RATE_LIMIT_WINDOW_MS: Window time untuk rate limit (15 menit = 900000 ms)
RATE_LIMIT_MAX_REQUESTS: Maksimal request per window (100 requests)
ALLOWED_ORIGINS: Domain yang diizinkan akses API
API_VERSION: Versi API
API_NAME: Nama API

Endpoint API
1. Health Check
GET /api/health
Mengecek status kesehatan service.
Response (200):
json{
  "status": "success",
  "message": "Service is healthy",
  "uptime": 123.456,
  "timestamp": "2025-11-24T10:00:00.000Z",
  "environment": "development"
}
2. Metrics
GET /api/metrics
Menampilkan metrics aplikasi.
Response (200):
json{
  "status": "success",
  "data": {
    "totalRequests": 150,
    "uptime": 123.456,
    "memoryUsage": {...},
    "timestamp": "2025-11-24T10:00:00.000Z"
  }
}
3. API Info
GET /api/info
Menampilkan informasi lengkap API dan konfigurasi security.
Response (200):
json{
  "status": "success",
  "message": "RESTful API Members - Hardened Version",
  "version": "1.0.0",
  "student": {
    "name": "Helma Afifah",
    "nim": "230104040215",
    "class": "TI23A"
  },
  "endpoints": {...},
  "security": {
    "helmet": "enabled",
    "cors": "enabled",
    "rateLimit": "100 requests per 15 minutes"
  }
}
4. Get All Members
GET /api/members
5. Get Member by ID
GET /api/members/:id
6. Create Member
POST /api/members
Request Body:
json{
  "name": "Helma Afifah",
  "role": "Member",
  "joinedAt": "2024-11-24"
}
7. Update Member
PUT /api/members/:id
8. Delete Member
DELETE /api/members/:id
Fitur Keamanan
1. Helmet
Mengatur security headers HTTP untuk melindungi dari serangan umum:

X-Content-Type-Options
X-Frame-Options
Strict-Transport-Security
X-XSS-Protection

2. CORS (Cross-Origin Resource Sharing)
Membatasi akses API hanya dari origin yang diizinkan:
javascriptALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
3. Rate Limiting
Membatasi jumlah request untuk mencegah abuse dan DDoS:

Window: 15 menit (900000 ms)
Max Requests: 100 per window per IP

Response jika limit terlampaui (429):
json{
  "status": "error",
  "message": "Too many requests from this IP, please try again later."
}
Logging
Morgan Logger
Setiap HTTP request akan dicatat ke:

Console (format: dev) - untuk monitoring realtime
File logs/access.log (format: combined) - untuk audit trail

Format Log:
::1 - - [24/Nov/2025:10:00:00 +0000] "GET /api/members HTTP/1.1" 200 245
Error Handling
Global Error Handler
Semua error akan ditangani secara konsisten oleh middleware errorHandler.js.
Response Error Format:
json{
  "status": "error",
  "statusCode": 500,
  "message": "Error message here",
  "stack": "... (only in development mode)"
}
404 Not Found
Endpoint yang tidak ditemukan akan mengembalikan:
json{
  "status": "error",
  "message": "Endpoint not found"
}
Status Code yang Digunakan

200 - OK
201 - Created
204 - No Content
400 - Bad Request (validasi error)
404 - Not Found
429 - Too Many Requests (rate limit)
500 - Internal Server Error

Testing dengan Postman
Daftar Endpoint untuk Testing (9 Screenshot):

GET /api/health - Health check
GET /api/metrics - Metrics
GET /api/info - API information
GET /api/members - Get all members
GET /api/members/:id - Get member by ID
POST /api/members - Create new member
PUT /api/members/:id - Update member
DELETE /api/members/:id - Delete member
GET /api/members (dengan banyak request) - Test rate limiting

Cara Test Rate Limiting:

Buat request ke /api/members
Kirim request berkali-kali dengan cepat (lebih dari 100x dalam 15 menit)
Setelah limit terlampaui, akan muncul response 429

Monitoring
File Log
Semua request HTTP akan dicatat di file logs/access.log.
Contoh isi log:
::1 - - [24/Nov/2025:10:15:30 +0000] "GET /api/members HTTP/1.1" 200 156
::1 - - [24/Nov/2025:10:15:35 +0000] "POST /api/members HTTP/1.1" 201 89
::1 - - [24/Nov/2025:10:15:40 +0000] "GET /api/health HTTP/1.1" 200 112
Console Output
Server akan menampilkan informasi startup:
================================================
🚀 Server running on http://localhost:3000
📊 Environment: development
🛡️  Security: Helmet, CORS, Rate Limit enabled
📝 Logging: Morgan enabled (access.log)
================================================
📌 API Info: http://localhost:3000/api/info
💚 Health Check: http://localhost:3000/api/health
📈 Metrics: http://localhost:3000/api/metrics
================================================
Perbandingan dengan Versi UTS
AspekUTS (Basic)Praktikum 7 (Hardened)Security Headers❌✅ HelmetCORS Protection❌✅ ConfiguredRate Limiting❌✅ 100 req/15minRequest Logging❌✅ MorganError HandlingBasic✅ Global HandlerEnvironment ConfigHardcoded✅ .envHealth Check❌✅ /api/healthMetrics❌✅ /api/metricsProduction Ready❌✅ Yes
Checklist Praktikum 7

✅ Helmet security headers aktif
✅ CORS dengan origin restriction
✅ Rate limiting (100 req/15min)
✅ Morgan logging ke file dan console
✅ Global error handler
✅ Environment variables (.env)
✅ Health check endpoint
✅ Metrics endpoint
✅ Struktur folder modular
✅ Dokumentasi lengkap

Kesimpulan
API Members telah berhasil di-hardening dengan penambahan:

Security Layer - Helmet, CORS, Rate Limiting
Observability - Logging dengan Morgan
Monitoring - Health check dan metrics
Error Handling - Global error handler
Configuration Management - Environment variables

API ini sekarang siap untuk production-level deployment dengan standar keamanan dan monitoring yang baik.

Dikerjakan oleh:
Helma Afifah - 230104040215 - TI23A
Web Service Engineering - Praktikum 7 - Semester Ganjil 20251