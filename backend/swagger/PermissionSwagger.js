/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 10
 *         nama:
 *           type: string
 *           description: Nama siswa (biasanya muncul jika di-join dengan tabel users)
 *           example: "ahmad mukhlis farhan"
 *         reason:
 *           type: string
 *           example: "Urusan keluarga"
 *         start_time:
 *           type: string
 *           format: date-time
 *           example: "2025-12-30T08:00:00Z"
 *         end_time:
 *           type: string
 *           format: date-time
 *           example: "2025-12-31T20:00:00Z"
 *         status:
 *           type: string
 *           enum: [pending, accepted, denied]
 *           example: "pending"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-12-28T10:00:00Z"
 */

/**
 * @swagger
 * /api/permission/my-history:
 *   get:
 *     summary: Mendapatkan riwayat izin siswa (Student Only)
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar riwayat izin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */

/**
 * @swagger
 * /api/permission/admin/all:
 *   get:
 *     summary: Melihat semua daftar pengajuan izin (Admin Only)
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua daftar izin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */

/**
 * @swagger
 * /api/permission/request:
 *   post:
 *     summary: Mengajukan izin baru (Student Only)
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *               - start_time
 *               - end_time
 *             properties:
 *               reason:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Permintaan izin berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 permission:
 *                   $ref: '#/components/schemas/Permission'
 */
