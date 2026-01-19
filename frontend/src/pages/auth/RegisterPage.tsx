import React, { useState } from 'react';
import { Button, Label, TextInput, FileInput, Alert, Card } from 'flowbite-react';
import { Check, X, Loader2, UploadCloud } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: '',
        nim: '',
        password: '',
        prodi: '',
        semester: ''
    });

    const [photos, setPhotos] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'failure' | null, msg: string }>({ type: null, msg: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selected = Array.from(e.target.files);
            if (selected.length > 3) {
                setStatus({ type: "failure", msg: "Upload maksimal 3 foto saja." });
                return;
            }

            setPhotos(selected);
            setStatus({ type: null, msg: '' });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, msg: '' });

        try {
            if (photos.length !== 3) throw new Error("Harap upload 3 foto diri");
            // express
            const regRes = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const regData = await regRes.json();
            if (!regRes.ok) throw new Error(regData.message || 'Registrasi gagal');

            // n8n
            const n8nData = new FormData();
            n8nData.append('nim', formData.nim);
            photos.forEach(p => n8nData.append('files', p));

            const n8nRes = await fetch('http://localhost:5678/webhook-test/scan-face', {
                method: 'POST',
                body: n8nData
            })

            if (!n8nRes.ok) throw new Error('Gagal memproses foto dengan AI');

            setStatus({ type: 'success', msg: 'Registrasi berhasil! Silakan login.' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error(error);
            setStatus({ type: 'failure', msg: (error as Error).message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="max-w-md w-full shadow-xl border-t-4 border-purple-600">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Daftar Face ID 📸
                    </h2>
                    <p className="text-sm text-gray-500">Sistem Absensi Cerdas</p>
                </div>

                {status.type && (
                    <Alert color={status.type} icon={status.type === 'success' ? Check : X} className="mb-4">
                        <span className="font-medium">{status.msg}</span>
                    </Alert>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nama">Nama Lengkap</Label>
                        </div>
                        <TextInput id="nama" name="nama" type="text" placeholder="Masukkan nama..." required onChange={handleChange} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nim">NIM</Label>
                        </div>
                        <TextInput id="nim" name="nim" type="text" placeholder="Contoh: 4420..." required onChange={handleChange} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <TextInput id="password" name="password" type="password" placeholder="••••••••" required onChange={handleChange} />
                    </div>

                    <div id="fileUpload" className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="file">Upload 3 Foto Wajah (Sisi Berbeda)</Label>
                        </div>

                        <div className="flex w-full items-center justify-center">
                            <Label
                                htmlFor="file"
                                className="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <UploadCloud className="mb-3 h-8 w-8 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">JPG atau PNG (Max 3 foto)</p>
                                </div>
                                <FileInput
                                    id="file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Label>
                        </div>

                        <p className={`text-sm mt-2 font-medium ${photos.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            {photos.length > 0 ? (
                                <span className="flex items-center gap-1">
                                    <Check size={16} /> {photos.length} foto siap diupload
                                </span>
                            ) : (
                                '⚠️ Belum ada foto dipilih'
                            )}
                        </p>
                    </div>

                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses model AI...
                            </>
                        ) : (
                            'Daftar Sekarang'
                        )}
                    </Button>

                    <p className="text-sm text-center text-gray-500 mt-2">
                        Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login disini</Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};