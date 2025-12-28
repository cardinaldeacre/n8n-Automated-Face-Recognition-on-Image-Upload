/**
 * @swagger
 * components:
 *   schemas:
 *     AttendanceLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 101
 *         user_id:
 *           type: integer
 *           example: 5
 *         type:
 *           type: string
 *           enum: [IN, OUT]
 *           example: "IN"
 *         status:
 *           type: string
 *           enum: [AUTHORIZED, VIOLATION]
 *           example: "AUTHORIZED"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-12-28T21:30:00Z"
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Manajemen log presensi (Admin Only)
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Mendapatkan semua daftar log presensi (Admin Only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar log
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AttendanceLog'
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Akses ditolak (Hanya admin)
 *       500:
 *         description: Error server
 */

/**
 * @swagger
 * /api/attendance/{id}:
 *   delete:
 *     summary: Menghapus log presensi berdasarkan ID (Admin Only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari log presensi
 *     responses:
 *       200:
 *         description: Log berhasil dihapus
 *       400:
 *         description: ID log tidak valid
 *       404:
 *         description: Log tidak ditemukan
 *       500:
 *         description: Error server
 */
