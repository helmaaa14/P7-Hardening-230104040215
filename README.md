# UTS Web Service Engineering - Members API

## Identitas Mahasiswa
- **Nama:** Helma Afifah
- **NIM:** 230104040215
- **Kelas:** TI23A
- **Digit Akhir NIM:** 5
- **Resource:** Members (Data Anggota Organisasi)

## Deskripsi Project
RESTful API untuk mengelola data anggota organisasi dengan operasi CRUD lengkap menggunakan Express.js.

## Field Data Members
- `id` (number) - ID unik member
- `name` (string) - Nama lengkap member
- `role` (string) - Peran dalam organisasi
- `joinedAt` (string) - Tanggal bergabung (format: YYYY-MM-DD)

## Teknologi yang Digunakan
- Node.js
- Express.js
- Nodemon (development)

## Cara Instalasi

1. Clone atau download project ini
2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Endpoint API

### 1. API Info
```
GET /api/info
```
Menampilkan informasi API dan identitas mahasiswa.

**Response (200):**
```json
{
  "status": "success",
  "message": "RESTful API Members - UTS Web Service Engineering",
  "student": {
    "name": "Helma Afifah",
    "nim": "230104040215",
    "class": "TI23A"
  },
  "endpoints": { ... }
}
```

### 2. Get All Members
```
GET /api/members
```
Mengambil semua data members.

**Response (200):**
```json
{
  "status": "success",
  "data": [...]
}
```

### 3. Get Member by ID
```
GET /api/members/:id
```
Mengambil data member berdasarkan ID.

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "role": "Chairman",
    "joinedAt": "2024-01-15"
  }
}
```

**Response (404):**
```json
{
  "status": "fail",
  "message": "Member tidak ditemukan"
}
```

### 4. Create New Member
```
POST /api/members
```
Menambah member baru.

**Request Body:**
```json
{
  "name": "Helma Afifah",
  "role": "Member",
  "joinedAt": "2024-11-10"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": 4,
    "name": "Helma Afifah",
    "role": "Member",
    "joinedAt": "2024-11-10"
  }
}
```

**Response (400) - Validasi Error:**
```json
{
  "status": "fail",
  "message": "Field 'name' wajib diisi"
}
```

### 5. Update Member
```
PUT /api/members/:id
```
Mengupdate data member berdasarkan ID.

**Request Body:**
```json
{
  "name": "Budi Santoso Updated",
  "role": "Vice Chairman",
  "joinedAt": "2024-01-15"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Budi Santoso Updated",
    "role": "Vice Chairman",
    "joinedAt": "2024-01-15"
  }
}
```

**Response (404):**
```json
{
  "status": "fail",
  "message": "Member tidak ditemukan"
}
```

**Response (400) - Validasi Error:**
```json
{
  "status": "fail",
  "message": "Field 'name' wajib diisi"
}
```

### 6. Delete Member
```
DELETE /api/members/:id
```
Menghapus member berdasarkan ID.

**Response (204):**
No content (berhasil dihapus)

**Response (404):**
```json
{
  "status": "fail",
  "message": "Member tidak ditemukan"
}
```

## Status Code yang Digunakan
- **200** - OK (berhasil mengambil/mengupdate data)
- **201** - Created (berhasil menambah data baru)
- **204** - No Content (berhasil menghapus data)
- **400** - Bad Request (validasi error)
- **404** - Not Found (data tidak ditemukan)
- **500** - Internal Server Error

## 7 Prinsip RESTful yang Diterapkan

### 1. Resource-Oriented URI
✅ Menggunakan kata benda jamak: `/api/members`

### 2. Proper HTTP Methods
✅ GET, POST, PUT, DELETE sesuai operasi CRUD

### 3. Stateless Communication
✅ Tidak ada session atau state di server, setiap request mandiri

### 4. Consistent Status Codes
✅ Menggunakan status code standar: 200, 201, 204, 400, 404

### 5. JSON Representation
✅ Semua response dalam format JSON yang konsisten

### 6. Validation & Error Handling
✅ Validasi field wajib dengan pesan error yang jelas

### 7. Discoverability
✅ Endpoint `/api/info` sebagai metadata dan dokumentasi service

## Struktur Folder
```
UTS-WSE-230104040215/
├── app.js                      # Entry point aplikasi
├── package.json                # Dependencies dan scripts
├── routes/
│   └── memberRoutes.js         # Definisi routing
├── controllers/
│   └── memberController.js     # Business logic CRUD
└── data/
    └── members.js              # Data dummy members
```

## Testing
Gunakan Postman untuk testing semua endpoint dengan koleksi request yang telah disediakan di atas.

## Checklist Pengerjaan
- ✅ CRUD lengkap berjalan
- ✅ Validasi input & error handling
- ✅ Status code konsisten
- ✅ Response JSON rapi
- ✅ Endpoint /api/info aktif
- ✅ Struktur folder sesuai template
- ✅ Screenshot hasil uji CRUD
- ✅ Penerapan 7 RESTful Principles

---

**Dikerjakan oleh:**  
Helma Afifah - 230104040215 - TI23A  
Web Service Engineering - UTS Semester Ganjil 20251