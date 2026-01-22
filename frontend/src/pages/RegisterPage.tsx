import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from "@/lib/api/services/authService";
import type { RegisterPayload } from "@/types";

// Import Komponen Baru
import { RegisterFaceStep } from "@/pages/RegisterFaceStep";

// Import UI Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<Partial<RegisterPayload>>({
        nama: '',
        nim: '',
        password: '',
        prodi: '',
        semester: 1
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    // lanjut ke step wajah
    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nama || !formData.nim || !formData.password || !formData.prodi) {
            setError("Harap isi semua data terlebih dahulu.");
            return;
        }
        setStep(2); // pindah ke layar kamera
    };

    // final submit, otomatis setelah 3 foto terambil)
    const handleFaceCaptureComplete = async (photos: File[]) => {
        setLoading(true);
        setError('');

        try {
            const payload: RegisterPayload = {
                nama: formData.nama!,
                nim: formData.nim!,
                password: formData.password!,
                prodi: formData.prodi!,
                semester: Number(formData.semester),
                photos: photos
            };

            console.log("Mengirim data ke backend...", payload);

            await authService.register(payload);

            alert("Registrasi Berhasil! Data wajah telah direkam.");
            navigate('/login');

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-slate-50">
            <Card className="w-full max-w-md shadow-xl border-slate-200">

                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        {step === 1 ? "Data Mahasiswa" : "Rekam Wajah AI"}
                    </CardTitle>
                    <CardDescription>
                        {step === 1
                            ? "Isi biodata lengkap untuk pendaftaran"
                            : "Ikuti instruksi untuk merekam biometrik wajah"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="p-3 mb-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <form onSubmit={handleNextStep} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Nama Lengkap</Label>
                                <Input name="nama" onChange={handleChange} value={formData.nama} placeholder="Nama sesuai KTM" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>NIM</Label>
                                    <Input name="nim" onChange={handleChange} value={formData.nim} placeholder="442..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Semester</Label>
                                    <Input name="semester" type="number" onChange={handleChange} value={formData.semester} min={1} max={14} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Prodi</Label>
                                <Input name="prodi" onChange={handleChange} value={formData.prodi} placeholder="Teknik Informatika" required />
                            </div>

                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="******" required />
                            </div>

                            <Button type="submit" className="w-full mt-2">
                                Lanjut ke Scan Wajah <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="duration-300 animate-in fade-in zoom-in">
                            {loading ? (
                                <div className="py-10 space-y-4 text-center">
                                    <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
                                    <h3 className="text-lg font-medium">Mengupload Data Wajah...</h3>
                                    <p className="text-sm text-gray-500">Mohon tunggu sebentar, jangan tutup halaman ini.</p>
                                </div>
                            ) : (
                                <RegisterFaceStep onPhotosCaptured={handleFaceCaptureComplete} />
                            )}
                        </div>
                    )}

                </CardContent>

                {step === 1 && (
                    <CardFooter className="justify-center">
                        <p className="text-sm text-muted-foreground">
                            Sudah punya akun? <Link to="/login" className="font-bold text-primary hover:underline">Login disini</Link>
                        </p>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};
